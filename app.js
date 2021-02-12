/***future updates:
  blank list items (reject empty strings from a list of guests (in the submit handler))
    -alert user what happens )append to the DOM
    -reject duplicate names

  checkbox updates: unchecked says 'confirm' & checked says 'confirmed'
    research text nodes (target the text node to complete)

create additional place to take notes--using a text area

add a select element to mark 'not attending'

add behavior to hide the check box when the app is filtered

local storage saves information even when refreshed (save names)
***/
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registrar'); //selects form
  const input = form.querySelector('input'); //selects whatever is typed into the form
  const mainDiv = document.querySelector('.main');
  const ul = document.getElementById('invitedList');


  //add check box to filter guests
  const div = document.createElement('div');
  const filterLabel = document.createElement('label');
  const filterCheckBox = document.createElement('input');

  filterLabel.textContent = "Hide those who haven't responded";
  filterCheckBox.type = 'checkbox';
  div.appendChild(filterLabel);
  div.appendChild(filterCheckBox);
  mainDiv.insertBefore(div, ul);
  filterCheckBox.addEventListener('change', (e) => {
    const isChecked = e.target.checked; //true or false
    const lis = ul.children;
    if (isChecked) {
      for (let i=0; i< lis.length; i++) {
        let li = lis[i];
        if (li.className === 'responded') {
          li.style.display = '';
        } else {
          li.style.display = 'none';
        }
      }
    } else {
        for (let i=0; i< lis.length; i++) {
          let li = lis[i];
          li.style.display = '';
        }
    }
  });

  //assembles an invitee "card"
  function createLI(text) {
    function createElement(elementName, property, value) {
      const element = document.createElement(elementName);
      element[property] = value;
      return element;

    }
    function appendToLI(elementName, property, value) {
      const element = createElement(elementName, property, value);
      li.appendChild(element);
      return element;
    }

    const li = document.createElement('li');
    appendToLI('span','textContent', text);
    //add a checkbox to mark if confirmed
    appendToLI('label', 'textContent', 'Confirm')
      .appendChild(createElement('input','type', 'checkbox'));
    //add an edit button
    appendToLI('button', 'textContent', 'Edit');
    //add a remove button
    appendToLI('button', 'textContent','Remove');
    return li;
  }

  //adds an invtee "card" to the page for each invitee
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value;
    input.value = '';
    const li =  createLI(text);
    ul.appendChild(li);
  });

  //change formatting if checkbox is checked
  ul.addEventListener('change', (e) =>{
    const checkbox = event.target;
    const checked = checkbox.checked;
    const listItem = checkbox.parentNode.parentNode;

    if (checked) {
      listItem.className = 'responded';
    } else {
      listItem.className = '';
    }
  });

  //remove or edit a guest using a button
  ul.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      const button = e.target;
      const li = e.target.parentNode;
      const ul = li.parentNode;
      const action = button.textContent;
      const nameActions = {
        Remove: () => {
          ul.removeChild(li);
        },
        Edit: () => {
          const span = li.firstElementChild;
          const input = document.createElement('input');
          input.type = 'text';
          input.value = span.textContent;
          li.insertBefore(input, span);
          li.removeChild(span);
          button.textContent = "Save";
        },
        Save: () => {
          const input = li.firstElementChild;
          const span = document.createElement('span');
          span.textContent = input.value;
          li.insertBefore(span, input);
          li.removeChild(input)
          button.textContent = 'Edit';
      }
    };
      //select and run action in botton's name
      nameActions[action]();
    }
    });
})
