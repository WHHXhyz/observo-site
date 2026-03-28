(function(){
  function ready(fn){
    if(document.readyState === "loading"){ document.addEventListener("DOMContentLoaded", fn); }
    else { fn(); }
  }

  function initMenu(){
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

    btn.addEventListener("click", function(e){ e.preventDefault(); toggle(); });

    // Close when a link inside the panel is clicked
    panel.addEventListener("click", function(e){
      var a = e.target && (e.target.closest ? e.target.closest("a") : null);
      if(a) close();
    });

    // Close when clicking outside
    document.addEventListener("click", function(e){
      if(!isOpen()) return;
      if(panel.contains(e.target) || btn.contains(e.target)) return;
      close();
    });

    // Close on Escape
    document.addEventListener("keydown", function(e){
      if(e.key === "Escape") close();
    });

    // Close on resize/orientation change
    window.addEventListener("resize", function(){ if(isOpen()) close(); });
  }

  function initReveal(){
    var els = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
    if(!els.length) return;

    function turnOn(el){ el.classList.add("on"); }

    // If IntersectionObserver exists, animate on scroll
    if("IntersectionObserver" in window){
      try{
        var io = new IntersectionObserver(function(entries){
          entries.forEach(function(entry){
            if(entry.isIntersecting){
              turnOn(entry.target);
              io.unobserve(entry.target);
            }
          });
        }, { threshold: 0.12 });

        els.forEach(function(el){ io.observe(el); });

        // Safety: if something prevents IO from firing, reveal everything shortly after load
        setTimeout(function(){ els.forEach(turnOn); }, 1500);
        return;
      }catch(_err){
        // fall through to instant reveal
      }
    }

    // Fallback: reveal immediately (prevents "blank page" if JS/CSP/observer fails)
    els.forEach(turnOn);
  }

  ready(function(){
    initMenu();
    initReveal();
  });
})();