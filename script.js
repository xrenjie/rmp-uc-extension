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
              if (!element.innerHTML.includes("<a")) {
                let names = element.innerHTML.split(";");
                element.innerHTML = "";

                names.forEach((name) => {
                  name = name.trim();
                  let fullname = name.split(" ");
                  if (fullname.length > 1) {
                    let firstName = fullname[0];
                    let lastName = fullname[fullname.length - 1];
                    let newHTML = getLink(firstName, lastName, name);
                    element.innerHTML += newHTML + "; ";
                  } else {
                    element.innerHTML = "Staff";
                  }
                });
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

function getLink(firstName, lastName, fullName) {
  return (
    '<a href="https://www.ratemyprofessors.com/search/teachers?query=' +
    firstName +
    "%20" +
    lastName +
    '" target="_blank">' +
    fullName +
    "</a>"
  );
}
