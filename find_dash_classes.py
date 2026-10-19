import re

with open('reference-data/OnGround_CallCentre_App_Mock.html', encoding='utf-8', errors='ignore') as f:
    content = f.read()

# Let's search for classes inside asc-dash
dash_start = content.find('id="asc-dash"')
dash_end = content.find('<div class="sc"', dash_start + 20)
dash_html = content[dash_start:dash_end]

classes = set(re.findall(r'class="([^"]+)"', dash_html))
print("Classes in asc-dash:", len(classes))

# Look for rules matching these classes
for cls_group in classes:
    for c in cls_group.split():
        if len(c) > 2:
            m = re.search(r'\.' + re.escape(c) + r'\s*\{([^}]+)\}', content)
            if m:
                print(f".{c} -> {m.group(1)[:120]}")
