/*global $, jQuery, alert, console*/


var body = $('body')
var navInner;

function generate(index){
    readFile(index);
}

function readFile(index){
    "use strict";
    jQuery.getJSON('../projects/projects.json', function(all_projects) {
        var project = all_projects.projects[index];
        body.append(createNavBar(project));
        for(var i in project.subpages){
            var subpage = project.subpages[i];
            createSubPage(subpage);

        }
    });
}


function createNavBar(){
    var navBar = createElement('div', 'nav navy');
    navInner = createElement('div', 'navy');

    navBar.appendChild(navInner);

    navInner.appendChild(createNavButton('Home', '../index.html#about'));
    navInner.appendChild(createNavButton('Projects', '../index.html#projects'));

    return navBar;
}
function createNavButton(text, reference){
    var element = createElement('a', 'navButton navy_hover no_underline smoothScroll');
    element.innerHTML = text;
    element.setAttribute('href', reference);
    return element;
}
function createSubPage(subpage){
    if(subpage.type == "link"){
        navInner.appendChild(createNavButton(subpage.header, subpage.value));
    }
    else{
        var border = createElement('div', 'sub_border');

        var page = createElement('div', 'sub_page');

        if(subpage.type == "text"){
            createText(subpage, page);
        }
        else if(subpage.type == "list"){
            createList(subpage, page);
        }
        else if(subpage.type == "video"){
            createVideo(subpage, page);
        }
        if(subpage.backgroundURL){
            var style = 'background-image: url(../' + subpage.backgroundURL + ');'
            page.setAttribute('style', style);
        }

        border.appendChild(page);
        body.append(border);
    }


}

function createHeader(title){
    var element = createElement('h1', 'sub_page_header');
    element.innerHTML = title;
    return element;
}

function createText(subpage, page){
    if(subpage.header){
        page.appendChild(createHeader(subpage.header));
    }
    var para = createElement('p', 'para_A');
        var style = 'margin-right: 150px;'
    para.setAttribute('style', style);
    para.innerHTML = subpage.value;
    page.appendChild(para);
}
function createList(subpage, page){
    if(subpage.header){
        page.appendChild(createHeader(subpage.header));
            navInner.appendChild(createNavButton(subpage.header, '#' + subpage.header));
        page.setAttribute('id', subpage.header);
    }

    var para = createElement('p', 'para_A');
        var style = 'margin-right: 150px;'
    para.setAttribute('style', style);
    for(let i = 0; i < subpage.value.length; i++){
      let element = createElement('p');
      element.innerHTML = subpage.value[i];
      element.setAttribute('class', 'listItem');
      para.appendChild(element);
    }
    page.appendChild(para);
}

function createVideo(subpage, page){
    var element = createElement('iframe');
    if(subpage.header){
        navInner.appendChild(createNavButton(subpage.header, '#' + subpage.header));
        element.setAttribute('id', subpage.header);
    }
    element.setAttribute('type', 'text/html');
    element.setAttribute('width', '100%');
    element.setAttribute('height', '650');
    element.setAttribute('frameborder', 0);
    element.setAttribute('src', subpage.value);
    element.setAttribute('allowfullscreen', true);
    page.appendChild(element);
}

function createImage(){

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
