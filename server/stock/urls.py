from django.urls import path
from stock.views import korea_companies, FundamentalAnalysis

urlpatterns = [
    path("korea-companies/", korea_companies),
    path("korea/companies/<company_code>/fundamental-analysis/", FundamentalAnalysis.as_view())
]

