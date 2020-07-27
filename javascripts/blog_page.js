/*global $, jQuery, alert, console*/


var body = $('body')
var navInner;
var blog;
var all_blogs;
var navItems = [];
function generate(index){
    readFile(index);
}

function readFile(index){
    "use strict";
    jQuery.getJSON('/blog/blogs.json', function(result) {
        all_blogs = result;
        blog = all_blogs.blogs[index];
        body.append(createNavBar());
        var subpage = createElement('div', 'sub_page');
        subpage.appendChild(createSection({'type': 'banner', 'value': blog.image}));
        if (blog.name !== 'all') {
            subpage.appendChild(createSection({'type': 'title', 'value': blog.name}));
            subpage.appendChild(createSection({'type': 'text', 'value': blog.date}));
        }
        for(var i in blog.sections){
            var section = blog.sections[i];
            subpage.appendChild(createSection(section));
        }
        if (blog.name === 'all') {
            for(let i = 1; i < all_blogs.blogs.length; i++){
                var blog_post = all_blogs.blogs[i];
                subpage.appendChild(createBlogButton(blog_post));
            }
        }
        subpage.setAttribute('style', 'padding-top: 0px;');
        body.append(subpage);
        appendNavItems();
    });
}

function appendNavItems(){
  for(let i = navItems.length - 1; i >= 0; i--){
    navInner.appendChild(navItems[i]);
  }
}

function createNavBar(){
    var navBar = createElement('div', 'nav primary_transparent card_out');
    navInner = createElement('div');

    navBar.appendChild(navInner);
    let title =  createElement('h1', 'sub_page_header primary_text');
    title.innerHTML = all_blogs.page.title;
    title.setAttribute('style', 'text-align: center; float: left; padding: 10px;');
    navInner.appendChild(title)
    navBar.appendChild(createElement('div', 'clear'));

    for(var i in all_blogs.page.links){
        let link = all_blogs.page.links[i];
        if (!(blog.name == 'all' && link.title === 'Blogs')) {
            navItems.push(createNavButton(link.title, link.value));
        }
      }
    navItems.push(createShareButton());

    return navBar;
}
function createShareButton(){
    var shareButton = createNavButton('Share on LinkedIn', 'https://www.linkedin.com/shareArticle?mini=true&url=' + window.location.href);
    shareButton.onclick = function(event) {
        event.preventDefault();
        window.open($(this).attr("href"), "popupWindow", "width=600,height=600,scrollbars=yes");
    };
    return shareButton;
}

function createNavButton(text, reference){
    var element = createElement('a', 'navButton primary_text hover no_underline smoothscroll');
    element.innerHTML = text;
    element.setAttribute('href', reference);
    return element;
}
function createSection(section){
    var element = createElement('div');
    var elementStyle = 'margin: 25px auto; max-width: 700px;';
    if(section.type === "banner"){
        appendBanner(element, section.value);
    }
    else if(section.type === "title"){
        appendHeader(element, section.value, 'h1');
        element.setAttribute('style', elementStyle);
    }
    else if(section.type === "header"){
        appendHeader(element, section.value, 'h3');
        element.setAttribute('style', elementStyle);
    }
    else if(section.type === "header2"){
        appendHeader(element, section.value, 'h4', weight='light');
        element.setAttribute('style', elementStyle, '100');
    }
    else if(section.type === "text"){
        appendText(element, section.value);
        element.setAttribute('style', elementStyle);
    }
    else if(section.type === "text-list"){
        appendTextList(element, section.value);
        element.setAttribute('style', elementStyle);
    }
    return element;
}

function appendHeader(section, value, size, weight='bold'){
    var element = createElement(size, 'secondary_text');
    element.setAttribute('style', 'font-weight:' + weight + ';');
    element.innerHTML = value;
    section.appendChild(element);
}

function appendBanner(section, value){
    var element = createElement('div', 'banner sub_page_header secondary_text');
    var style = ('background-image: url(' + value + '); min-height: 500px; margin-bottom: 45px;');
    element.setAttribute('style', style);
    section.appendChild(element);
}

function appendText(section, value, children){
    if (value && value.length > 0){
        var para = createElement('p', 'para_blog');
        para.innerHTML = value;
        section.appendChild(para);
    }
}
function appendTextList(section, children){
    if (children && children.length > 0){
        var para = createElement('p', 'para_blog');
        for(i in children){
            var child = createElement('p');
            child.setAttribute('style', 'padding-left: 20px;');
            child.innerHTML = children[i];
            para.appendChild(child);
        }
        section.appendChild(para);
    }
}

function createBlogButton(blog_post) {
    var element = createElement('button', 'banner secondary-text blog_button hover');
    var style = ('background-image: url(' + blog_post.image + ');');
    element.setAttribute('style', style);
    var buttonText = createElement('h1', 'blog_button_text');
    buttonText.innerHTML = blog_post.name;
    var buttonDate = createElement('h6', 'blog_button_text');
    buttonDate.innerHTML = blog_post.date;
    buttonText.appendChild(buttonDate);
    element.appendChild(buttonText);
    element.onclick= function(event) {
        window.location.href = './' + blog_post.name.toLowerCase().replace(/ /g, '_') + '.html';
    }
    return element;
}
