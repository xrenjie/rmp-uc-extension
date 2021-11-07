var observer = new MutationObserver(function (mutations) {
  for (let mutation of mutations) {
    for (let addedNode of mutation.addedNodes) {
      let className = addedNode.className;
      if (typeof className !== "undefined") {
        if (className.includes("course_box")) {
          let instructors = document.querySelectorAll(
            '[title="Instructor(s)"]'
          );

          if (instructors.length > 0) {
            instructors.forEach((element) => {
              let name = element.innerHTML.split(" ");
              if (name.length > 1) {
                let firstName = name[0];
                let lastName = name[name.length - 1];

                element.innerHTML =
                  '<a href="https://www.ratemyprofessors.com/search/teachers?query=' +
                  firstName +
                  "%20" +
                  lastName +
                  '" target="_blank">' +
                  element.innerHTML +
                  "</a>";
              }
            });
          }
        }
      }
    }
  }
});

observer.observe(document, {
  characterData: true,
  childList: true,
  subtree: true,
});
