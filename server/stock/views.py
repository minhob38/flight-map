from dart_fss import corp
from django.http import HttpResponse, HttpResponseNotFound, HttpResponseServerError
from django.views.decorators.csrf import csrf_exempt
from bs4 import BeautifulSoup
import os
import requests
import json
import re
import datetime
import dart_fss as dart
from django.views import View
from .helpers.get_financial_statements import get_balance_sheet

@csrf_exempt
def korea_companies(request):
    try:
        if request.method == "GET":
            data = []
            URL = "https://finance.naver.com/sise/sise_market_sum.naver?sosok=0&page=100"
            response = requests.get(URL)
            MAX_PAGE = 34

            for page in range(1, MAX_PAGE):
                URL = f"https://finance.naver.com/sise/sise_market_sum.naver?sosok=0&page={page}"
                response = requests.get(URL)
                status_code = response.status_code

                if status_code != 200: continue

                html = response.text
                soup = BeautifulSoup(html, "html.parser")
                table = soup.select("#contentarea > div.box_type_l > table.type_2 > tbody > tr")

                for co_info in table:
                    try:
                        co_name_tag = co_info.select_one("td:nth-child(2) > a")
                        regex = re.compile("code=\d*\d$")
                        data.append({
                            "co_code" : regex.search(co_name_tag["href"]).group().split('=')[-1],
                            "co_name" : co_name_tag.text,
                            "co_stock_price" : co_info.select_one("td:nth-child(3)").text,
                            "co_market_cap" : co_info.select_one("td:nth-child(7)").text,
                            "co_stock_num" : co_info.select_one("td:nth-child(8)").text,
                            "co_stock_vol" : co_info.select_one("td:nth-child(10)").text,
                            "co_per" : co_info.select_one("td:nth-child(11)").text,
                            "co_roe" : co_info.select_one("td:nth-child(12)").text
                        })
                    except (TypeError, AttributeError) as e: continue
            return HttpResponse(json.dumps(data, ensure_ascii=False), content_type="application/json")
        else:
            return HttpResponseNotFound("not found")
    except Exception as e:
        data = {"status": "error", "message": str(e)}
        return HttpResponseServerError(json.dumps(data), content_type="application/json")

class FundamentalAnalysis(View):
    @csrf_exempt
    def get(self, request, **kwargs):
        try:
            DART_API_KEY = os.environ.get("DART_API_KEY")
            dart.set_api_key(api_key=DART_API_KEY)

            current_year = datetime.datetime.now().year
            company_code = kwargs["company_code"]
            fs = dart.fs.extract(corp_code=company_code, bgn_de=f'{current_year}0101')

            df_is = fs["is"] # 연결손익계산서(Income Statement)
            df_cis = fs["cis"] # 연결포괄손익서(Comprehensive Income Statement)
            df_cf = fs["cf"] # 현금흐름표(Cash Flow Statement)

            df_bs = get_balance_sheet(fs)

            data= df_bs.to_json(orient='columns')
            return HttpResponse(data, content_type="application/json")
        except Exception as e:
            print(e)
            data = {"status": "error", "message": str(e)}
            return HttpResponseServerError(json.dumps(data), content_type="application/json")
