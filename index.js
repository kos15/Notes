populate()

// Function to populate the notes if exists or not...
function populate() {
    let title = document.getElementById("titleTxt");
    let body = document.getElementById("notesTxt");
    title.value=""; body.value="";
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        localStorage.setItem("notes", null);
    }
    else {
        let refrence = document.getElementById("new_div");
        if (refrence != null)
            refrence.remove();
        let obj = JSON.parse(notes);
        let html = ``
        Array.from(obj).forEach((element, index) => {
            html += `<div class="card" style="width: 18rem; margin :1rem;box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);">
                        <div class="card-body">
                            <h5 class="card-title">${element.title}</h5>
                            <br>
                            <p class="card-text">${element.body}</p>
                            <button class="btn btn-outline-danger my-2 my-sm-0" id="${index}" onclick="del(${index})">Delete</button>
                        </div>
                    </div>`
        });
        let div = document.createElement("div");
        div.setAttribute("id", "new_div");
        div.setAttribute("class", "row");
        div.innerHTML = html;
        let ref = document.getElementById("div_row");
        ref.insertBefore(div, document.getElementById("hr"))
    }
}


//Function to delete a single notes
function del(index) {
    let notes = localStorage.getItem("notes");              //get the local storage
    let obj = JSON.parse(notes)                             //converted string to JSON object
    obj.splice(index, 1)                                    //deleted the object at the index defined
    localStorage.setItem("notes", JSON.stringify(obj));     //updated the local storage
    populate();
}

//Fuction to edit a single notes


//Reference object
function obj(title, body) {
    this.title = title,
        this.body = body,
        setTitle = function (newTitle) {
            this.title = newTitle;
        },
        editBody = function (newBody) {
            this.body = newBody;
        }
}

//Function to add notes to the local storage
function addNotes() {
    let title = document.getElementById("titleTxt").value;
    let body = document.getElementById("notesTxt").value;
    let newNote = new obj(title, body);
    let ls = localStorage.getItem("notes")
    if (ls == null) {
        // if the localStroage is not present ...create a new and insert the new note
        localStorage.setItem("notes", JSON.stringify(obj))
        populate();
        title.value = " ";
        body.value = " ";
    } else {
        //if local storage is present fetch the local storage appent the new notes and populate
        let oldls = Array.from(JSON.parse(ls));
        oldls.push(newNote);
        localStorage.setItem("notes", JSON.stringify(oldls));
        populate()
        title.value = " ";
        body.value = " ";
    }

}