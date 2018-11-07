import json
from pprint import pprint

with open('projects.json') as json_data:
    projects = json.load(json_data)
    json_data.close()
    #pprint(d)
    projects_list = projects['projects']
    for i in range(len(projects_list)):
    	project = projects_list[i]
    	space_name = project['name']
    	name = space_name.replace(' ', '_').lower()
    	project_file = open(name + '.html', 'w')
    	project_file.write('''<!DOCTYPE html>
<html
	<head>
    <script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

      ga('create', 'UA-71687144-1', 'auto');
      ga('send', 'pageview');

    </script>
	<link href="https://fonts.googleapis.com/css?family=Calibri" rel="stylesheet">
	<link rel="stylesheet" type="text/css" media="screen" href="../stylesheets/stylesheet.css">
	<title>Vanshil - ''' + space_name + '''</title>
	<link rel="shortcut icon" type="image/x-icon" href="../images/icon.png" />


	</head>

	<body>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
        <script src="javascripts/vanshil_site.js"></script>
        <script src="../javascripts/project_page.js"></script>
        <script type="text/javascript">
        generate(''' + str(i) + ''');
        </script>
	</body>

</html>''')
