/*global $, jQuery, alert*/
var projects_page = $('#projects_page');
var projects_featured;
var projects_all;
var length = 0;
$(document).ready(function() {
    loadProjects();
});

function loadProjects(){
   jQuery.getJSON('projects/projects.json', function(data) {
       projects_featured = createElement('div');
       projects_all = createElement('div');
       
       var featured = createElement('div');
       
       var android = createElement('div');
       var java = createElement('div');
       var hardware = createElement('div');
       
       var all_projects = data.projects;
       
       for(var i in all_projects){
           var project = all_projects[i];
           console.log(project.name);
           var path = 'projects/' + project.name.replace(' ', '_') + '.html';
           path = path.toLowerCase();
           var proj_button = createProjectButton(project.name, project.description, path);
           
            if($.inArray('featured', project.categories) > -1){//looks for 'featured in the categories.
                var feat_button = createProjectButton(project.name, project.description, path);
                featured.appendChild(feat_button);
            }
            if($.inArray('android', project.categories) > -1){
                android.appendChild(proj_button);
                console.log(project.categories);
            }
            else if($.inArray('java', project.categories) > -1){
                java.appendChild(proj_button);
            }
            else if($.inArray('hardware', project.categories) > -1){
                hardware.appendChild(proj_button);
            }
       }
       projects_featured.appendChild(createHeader('Featured Projects'));
       projects_featured.appendChild(featured);
       
       projects_all.appendChild(createHeader('Android'));
       projects_all.appendChild(android);
    /*   
       projects_all.appendChild(createHeader('Java'));
       projects_all.appendChild(java);*/
       
       projects_all.appendChild(createHeader('Hardware / Robotics'));
       projects_all.appendChild(hardware);
       projects_all.style.display = 'none';
       
       projects_page.append(projects_featured);
       projects_page.append(projects_all);
       length = all_projects.length;
       setUpAllButton();
       
   
   });
}

function createProjectButton(title, text, reference){
    var button = createElement('a', 'thirds navy_hover');
    button.innerHTML = title;
    if(text){
        var description = createElement('h6', 'description');
        description.innerHTML = text;
        button.appendChild(description);
    }
    button.setAttribute('href', reference);
    return button;
}

function setUpAllButton(){
    var all = createElement('a', 'quarters navy_hover no_underline');
    all.innerHTML = "See All (" + length + ")";
    all.setAttribute('id', '#all_projects');
    all.setAttribute('href', '#projects');
    all.onclick = allClick;
    allButton = all;
    projects_page.append(all);
}

function allClick(){
    if(projects_all.style.display == "none"){
        $(projects_featured).hide('slow');
        $(projects_all).show('slow');
        allButton.innerHTML = "See Less";
    }
    else{
        $(projects_featured).show('slow');
        $(projects_all).hide('slow');
        allButton.innerHTML = "See All (" + length + ")";
    }
}

function createHeader(title){
    var element = createElement('h1', 'sub_page_header');
    element.innerHTML = title;
    return element;
}



function createElement(elementType){
    return document.createElement(elementType);
}
function createElement(elementType, elementClasses){
    return createElement(elementType, elementClasses, "")
}
function createElement(elementType, elementClasses, elementID){
    var element = document.createElement(elementType);
    if(elementClasses){
        element.setAttribute("class", elementClasses);   
    }
    if(elementID){
        element.setAttribute("id", elementID);    
    }    
    return element;
}