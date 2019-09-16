//jQuery time
let atual_etapa, proximo_etapa, anterior_etapa; //fieldsets
let left, opacity, scale; //propriedades dos fieldsets que vamos animar
let animating; //flag para prevenir bugs de muitos cliques seguindo

$(".proximo").click(function() {
  if (animating) return false;
  animating = true;

  atual_etapa = $(this).parent();
  proximo_etapa = $(this)
    .parent()
    .next();

  //ativa o proximo passo em barra_progresso usando o indice de proximo_etapa
  $("#barra_progresso li")
    .eq($("fieldset").index(proximo_etapa))
    .addClass("active");

  //mostra o proximo fieldset
  proximo_etapa.show();
  //esconde o fieldset atual com css
  atual_etapa.animate(
    { opacity: 0 },
    {
      step: function(now, mx) {
        //coforme a opacidade de atual_etapa diminui para 0 fica armazenada em "now"
        // 1. diminui opacidade atual_etapa em 0.8
        scale = 1 - (1 - now) * 0.2;
        // 2. traz proximo_etapa da direita (50%)
        left = now * 50 + "%";
        // 3 aumenta a opacidade de proximo_etapa para 1 na entrada
        opacity = 1 - now;
        atual_etapa.css({
          transform: "scale(" + scale + ")",
          position: "absolute"
        });
        proximo_etapa.css({ left: left, opacity: opacity });
      },
      duration: 700,
      complete: function() {
        atual_etapa.hide();
        animating = false;
      },
      //parametro vindo do jquery easing
      easing: "easeInOutBack"
    }
  );
});

$(".anterior").click(function() {
  if (animating) return false;
  animating = true;

  atual_etapa = $(this).parent();
  anterior_etapa = $(this)
    .parent()
    .prev();

   // desativa a etapa atual em barra_progresso

  $("#barra_progresso li")
    .eq($("fieldset").index(atual_etapa))
    .removeClass("active");

  // mostra o fieldset anterior
  anterior_etapa.show();
  //mostra o fieldset atual com CSS
  atual_etapa.animate(
    { opacity: 0 },
    {
      step: function(now, mx) {
        //coforme a opacidade de atual_etapa diminui para 0 fica armazenada em "now"
        //1. muda opacidade de anterior_etapa de 0.8 para 1
        scale = 0.8 + (1 - now) * 0.2;
        //2. empurra atual_etapa para direita(50%) - de 0%
        left = (1 - now) * 50 + "%";
        //3. aumenta opacidade de anterior_etapa para 1 enquanto entra em cena
        opacity = 1 - now;
        atual_etapa.css({ left: left });
        anterior_etapa.css({
          transform: "scale(" + scale + ")",
          opacity: opacity
        });
      },
      duration: 700,
      complete: function() {
        atual_etapa.hide();
        animating = false;
      },
        //parametro vindo do jquery easing
      easing: "easeInOutBack"
    }
  );
});

$(".submit").click(function() {
  return false;
});
