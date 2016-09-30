/*global $, jQuery, alert, console*/


var body = $('body')
var navInner;
var project;
var navItems = [];
function generate(index){
    readFile(index);
}

function readFile(index){
    "use strict";
    jQuery.getJSON('../projects/projects.json', function(all_projects) {
        project = all_projects.projects[index];
        body.append(createNavBar(project));
        for(var i in project.subpages){
            var subpage = project.subpages[i];
            createSubPage(subpage);
        }
        appendNavItems();
    });
}

function appendNavItems(){
  for(let i = navItems.length - 1; i >= 0; i--){
    navInner.appendChild(navItems[i]);
  }
}

function createNavBar(project){
    var navBar = createElement('div', 'nav primary card_out');
    navInner = createElement('div', 'primary');

    navBar.appendChild(navInner);
    let title =  createElement('h1', 'sub_page_header primary_text');
    title.innerHTML = project.name;
    title.setAttribute('style', 'text-align: center; float: left; padding: 10px;');
    navInner.appendChild(title)
    navBar.appendChild(createElement('div', 'clear'));

    navItems.push(createNavButton('Home', '../index.html#about'));
    navItems.push(createNavButton('Projects', '../index.html#projects'));

    return navBar;
}
function createNavButton(text, reference){
    var element = createElement('a', 'navButton primary_text hover no_underline smoothScroll');
    element.innerHTML = text;
    element.setAttribute('href', reference);
    return element;
}
function createSubPage(subpage){
    if(subpage.type === "link"){
          navItems.push(createNavButton(subpage.header, subpage.value));
    }
    else{
        let cardStyle = subpage.type === 'video'?'card_in secondary':'card_out';
        var border = createElement('div', cardStyle);

        var page = createElement('div', 'sub_page');

        if(subpage.type === "text"){
            createText(subpage, page);
        }
        else if(subpage.type === "list"){
            createList(subpage, page);
        }
        else if(subpage.type === "video"){
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
    var element = createElement('h1', 'sub_page_header primary_text');
    element.innerHTML = title;
    return element;
}

function createText(subpage, page){
    if(subpage.header && subpage.header !== project.name){
        page.appendChild(createHeader(subpage.header));
    }
    var para = createElement('p', 'para_A primary_text');
        var style = 'margin-right: 150px;'
    para.setAttribute('style', style);
    para.innerHTML = subpage.value;
    page.appendChild(para);
}
function createList(subpage, page){
    if(subpage.header){
        page.appendChild(createHeader(subpage.header));
          navItems.push(createNavButton(subpage.header, '#' + subpage.header));
        page.setAttribute('id', subpage.header);
    }

    var para = createElement('p', 'para_A secondary card_out');
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
        navItems.push(createNavButton(subpage.header, '#' + subpage.header));
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
