/*global chrome*/


var url = 'URL';
var currUrl = null;
var urlList = {};

chrome.contextMenus.create({ 
    id: 'Tax Calculator',
    title: 'Send Price',
    contexts: ['all']
  });


chrome.tabs.onActivated.addListener(function(activeInfo){
    chrome.tabs.get(activeInfo.tabId, function(tab){
        var url = new URL(tab.url)
        currUrl = url.hostname;
        if (tab.url.hostname in urlList){
            chrome.tabs.insertCSS({file: './static/css/app.css'}, function(tab){
                chrome.tabs.executeScript({file: './static/js/0.chunk.js'}, function(tab){
                    chrome.tabs.executeScript({file:'./static/js/content.js'});   
                })
            }
        )}
    }) 
})



chrome.tabs.onUpdated.addListener((tabId, change, tab) => {    
    if (tab.active && change.url) {   
        var url = new URL(change.url)
        currUrl = url.hostname; 
        // console.log("current url on updated:", url.hostname);
        if (change.url.hostname in urlList){
            // console.log("tab url is in url list on updated")
            chrome.tabs.insertCSS({file: './static/css/app.css'}, function(tab){
                chrome.tabs.executeScript({file: './static/js/0.chunk.js'}, function(tab){
                    chrome.tabs.executeScript({file:'./static/js/content.js'});   
                })
        })        
    }

}});


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.type === 'URL' ) {
            urlList = request.urlList;
            if (currUrl in urlList){
                chrome.tabs.insertCSS({file: './static/css/app.css'}, function(tab){
                    chrome.tabs.executeScript({file: './static/js/0.chunk.js'}, function(tab){
                        chrome.tabs.executeScript({file:'./static/js/content.js'});   
                    })
                })
            }
            return true;
        }
    }

)


// var fullpath = chrome.extension.getURL("./static/js/content.js")