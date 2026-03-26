import glob

html_files = glob.glob('*.html')
favicon_tag = '  <link rel="icon" type="image/png" href="images/favicon.png">\n'

for filepath in html_files:
    with open(filepath, 'r') as f:
        content = f.read()
        
    if 'rel="icon"' not in content:
        # Insert just before </head>
        content = content.replace('</head>', favicon_tag + '</head>')
        
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Added favicon to {filepath}")
    else:
        print(f"Favicon already in {filepath}")
