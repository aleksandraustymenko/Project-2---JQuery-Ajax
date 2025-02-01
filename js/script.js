document.addEventListener("DOMContentLoaded", function () {
  const element = document.getElementById("trescPodstrony");

  
  if (window.location.pathname === "/" || window.location.pathname === "/index.html") {
    // Ustaw treść domyślną bez ładowania zewnętrznego pliku
    element.innerHTML = `
      <h2>Witamy na stronie głównej</h2>
      <p>Wybierz jedną z opcji w menu, aby załadować treść z pliku.</p>
    `;
  } else {
    
    loadPage(window.location.pathname);
  }
});


function loadPage(path) {
  const element = document.getElementById("trescPodstrony");

 
  let page;
  switch (path) {
    case "/bootstrap":
      page = "page/bootstrap.html";
      break;
    case "/jquery":
      page = "page/jquery.html";
      break;
    case "/kontakt":
      page = "page/kontakt.html";
      break;
    default:
      page = "page/bootstrap.html"; 
      break;
  }

  
  const xhr = new XMLHttpRequest();
  xhr.open("GET", page, true);

  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      
      element.innerHTML = xhr.responseText;

      
      if (window.location.pathname !== path) {
        history.pushState({ page: path }, "", path);
      }
    } else {
      element.innerHTML = "<p>Błąd ładowania treści</p>";
    }
  };

  xhr.onerror = function () {
    element.innerHTML = "<p>Błąd ładowania treści</p>";
  };

  xhr.send();
}



window.addEventListener("popstate", (event) => {
  if (event.state && event.state.page) {
    loadPage(event.state.page);
  }
});


function loadContent(file) {
  const element = document.getElementById("trescPodstrony");

  if (file.endsWith('.json')) {
   
    $.ajax({
      url: file,
      method: 'GET',
      dataType: 'json',
      success: function (data) {
        let htmlContent = '<h3>Użytkownicy</h3>';
        data.users.forEach(user => {
          htmlContent += `<p>Imię: ${user.name}, Email: ${user.email}</p>`;
        });
        element.innerHTML = htmlContent;


        $('#trescPodstrony').hide().fadeIn(1000);


        $('#trescPodstrony').animate({
        left: '0px',
        opacity: 1
        }, 1000);
      },
      error: function () {
        element.innerHTML = '<p>Nie udało się załadować pliku JSON.</p>';
      }
    });
  } else if (file.endsWith('.txt')) {
    
    fetch(file)
      .then(response => response.text())
      .then(data => {
        element.innerHTML = `<pre>${data}</pre>`;

        $('#trescPodstrony').hide().fadeIn(1000);
        
        $('#trescPodstrony').animate({
          left: '0px',
          opacity: 1
        }, 1000);
      })
      .catch(error => {
        element.innerHTML = '<p>Nie udało się załadować pliku TXT.</p>';
      });
  } else {
    element.innerHTML = '<p>Nieznany format pliku.</p>';
  }
}

$('#loadTxt, #loadJson').hover(function() {
  $(this).animate({ opacity: 0.7 }, 200); 
}, function() {
  $(this).animate({ opacity: 1 }, 200); 
});


$('#loadTxt, #loadJson').click(function() {
  $(this).addClass('btn-animate');
  $(this).css('backgroundColor', '#000000');
  
  setTimeout(() => {
    $(this).css('backgroundColor', '#dc3545');
  }, 500);
});
