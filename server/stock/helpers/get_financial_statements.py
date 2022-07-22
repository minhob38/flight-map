from pandas.core.frame import DataFrame
import re
import json

def get_financial_statements(fs):
    get_df_cis(fs)


    bs = json.loads(get_df_bs(fs).to_json(orient='columns'))
    cis = json.loads(get_df_cis(fs).to_json(orient='columns'))
    cf = json.loads(get_df_cf(fs).to_json(orient='columns'))

    financial_statements = {
        'bs':  bs,
        'cis': cis,
        'cf': cf
    }

    return financial_statements

# dic에 dataframe넣자


# 연결재무상태표(Balance Sheet)
def get_df_bs(fs):
    df_bs = fs["bs"]

    title_column = df_bs.columns[0][0]

    label_ko = df_bs[
        title_column,
        "label_ko",
    ]

    df_processd_bs = DataFrame({"item": label_ko})

    for (col1, col2) in df_bs.columns:
        p = re.compile("\d{8}")
        m = p.match(col1)
        is_date = bool(m)

        if is_date:
            df_processd_bs[m.group()] = df_bs[m.group(), ("연결재무제표",)]

    return df_processd_bs

# 연결포괄손익계산서(Comprehensive Income Statement)
def get_df_cis(fs):
    df_cis = fs["cis"]

    title_column = df_cis.columns[0][0]

    label_ko = df_cis[(
        title_column,
        "label_ko"
    )]

    df_processd_cis = DataFrame({"item": label_ko})

    for (col1, col2) in df_cis.columns:
        p = re.compile("\d{8}-\d{8}")
        m = p.match(col1)
        is_date = bool(m)

        if is_date:
            df_processd_cis[m.group()] = df_cis[m.group(), ("연결재무제표",)]

    return df_processd_cis

# 현금흐름표(Cash Flow Statement)
def get_df_cf(fs):
    df_cf = fs["cf"]
    title_column = df_cf.columns[0][0]

    label_ko = df_cf[(
        title_column,
        "label_ko"
    )]

    df_processd_cf = DataFrame({"item": label_ko})

    for (col1, col2) in df_cf.columns:
        p = re.compile("\d{8}-\d{8}")
        m = p.match(col1)
        is_date = bool(m)

        if is_date:
            df_processd_cf[m.group()] = df_cf[m.group(), ("연결재무제표",)]

    return df_processd_cf

