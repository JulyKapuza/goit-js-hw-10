!function(){var n={searchBox:document.querySelector("#search-box"),countryList:document.querySelector(".country-list"),countryInfo:document.querySelector(".country-info")};fetch("https://restcountries.com/v3.1/name/peru").then((function(n){return n.json()})).then((function(o){var t=o.map((function(n){return'<li>\n      <svg><use href="'.concat(n.flags.svg,'"></use>\n            </svg>\n          <p> ').concat(n.name.common,"</p>\n         </li>")})).join("");n.countryList.innerHTML=t})).catch((function(n){console.log(n)}))}();
//# sourceMappingURL=index.8807064e.js.map