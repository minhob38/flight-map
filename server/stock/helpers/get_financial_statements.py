from pandas.core.frame import DataFrame
import re

# 연결재무상태표(Balance Sheet)
def get_balance_sheet(fs):
    df_bs = fs["bs"]

    label_ko = df_bs[
        "[D210000] Statement of financial position, current/non-current - Consolidated financial statements (Unit: KRW)",
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
