from django.http import HttpResponse, HttpResponseNotFound, HttpResponseServerError
from django.views.decorators.csrf import csrf_exempt
from bs4 import BeautifulSoup
import requests
import json
import re

@csrf_exempt
def domestic_companies(request):
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
            HttpResponseNotFound()
    except Exception as e:
        data = {"status": "error", "message": str(e)}
        return HttpResponseServerError(json.dumps(data), content_type="application/json")

