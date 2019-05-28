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
    jQuery.getJSON('../blog/blogs.json', function(result) {
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
    var navBar = createElement('div', 'nav primary card_out');
    navInner = createElement('div', 'primary');

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
        appendHeader(element, section.value, 'h4');
        element.setAttribute('style', elementStyle);
    }
    else if(section.type === "text"){
        appendText(element, section.value);
        element.setAttribute('style', elementStyle);
    }
    return element;
}

function appendHeader(section, value, size){
    var element = createElement(size, 'primary_text');
    element.setAttribute('style', 'font-weight: bold;');
    element.innerHTML = value;
    section.appendChild(element);
}

function appendBanner(section, value){
    var element = createElement('div', 'banner sub_page_header primary_text');
    var style = ('background-image: url(' + value + '); min-height: 450px; margin-bottom: 45px;');
    element.setAttribute('style', style);
    section.appendChild(element);
}

function appendText(section, value){
    if (value && value.length > 0){
        var para = createElement('p', 'para_B');
        para.innerHTML = value;
        section.appendChild(para);
    }
}

function createBlogButton(blog_post) {
    var element = createElement('button', 'banner secondary-text blog_button hover');
    var style = ('background-image: url(' + blog_post.image + ');');
    element.setAttribute('style', style);
    var buttonText = createElement('h1', 'blog_button_text');
    buttonText.innerHTML = blog_post.name;
    element.appendChild(buttonText);
    element.onclick= function(event) {
        window.location.href = './' + blog_post.name.toLowerCase().replace(/ /g, '_') + '.html';
    }
    return element;
}
