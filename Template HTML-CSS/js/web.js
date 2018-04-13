var slideIndex = 1;
var slideIndex2 = 1;
showSlides2(slideIndex2);
showSlides(slideIndex);


function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides2(slideIndex = n);
}
  function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) {
      slideIndex = 1
    }
    if (n < 1) {
      slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }

    slides[slideIndex - 1].style.display = "block";
  }


  function plusSlides2(n2) {
    showSlides2(slideIndex2 += n2);
  }

  function currentSlide2(n2) {
    showSlides2(slideIndex2 = n2);
  }
  function showSlides2(n2) {
    var i2;
    var slides2 = document.getElementsByClassName("mySlides2");
    if (n2 > slides2.length) {
      slideIndex2 = 1
    }
    if (n2 < 1) {
      slideIndex2 = slides2.length
    }
    for (i2 = 0; i2 < slides2.length; i2++) {
      slides2[i2].style.display = "none";
    }
    slides2[slideIndex2 - 1].style.display = "block";
  }
