(function(){
  function ready(fn){
    if(document.readyState === "loading"){ document.addEventListener("DOMContentLoaded", fn); }
    else { fn(); }
  }
  ready(function(){
    var btn = document.getElementById("menuBtn") || document.querySelector("[data-menu-btn]");
    var panel = document.getElementById("mobilePanel") || document.querySelector("[data-mobile-panel]");
    if(!btn || !panel) return;

    function isOpen(){ return btn.classList.contains("is-open"); }
    function open(){
      btn.classList.add("is-open");
      panel.classList.add("is-open");
      btn.setAttribute("aria-expanded","true");
    }
    function close(){
      btn.classList.remove("is-open");
      panel.classList.remove("is-open");
      btn.setAttribute("aria-expanded","false");
    }
    function toggle(){ isOpen() ? close() : open(); }

    btn.addEventListener("click", function(e){
      e.preventDefault();
      toggle();
    }, { passive:false });

    // close when navigating inside panel
    panel.addEventListener("click", function(e){
      var a = e.target.closest && e.target.closest("a");
      if(a) close();
    });

    // close on outside click
    document.addEventListener("click", function(e){
      if(!isOpen()) return;
      if(panel.contains(e.target) || btn.contains(e.target)) return;
      close();
    });

    // close on escape
    document.addEventListener("keydown", function(e){
      if(e.key === "Escape") close();
    });

    // close on resize/orientation change
    window.addEventListener("resize", function(){ if(isOpen()) close(); });
  });
})();