with open('app_build/styles.css', 'r', encoding='utf-8') as f:
    c = f.read()
terms = ['pagination-bar', 'problem-toolbar', 'filter-pill', 'filter-select', 'table-meta-bar', 'btn-page']
for t in terms:
    print(t, 'FOUND' if t in c else 'NOT FOUND')
