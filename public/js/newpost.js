var editor = document.getElementById('editor')
var dataInput = document.getElementById('datainput')
var dataInputs = document.getElementsByClassName('datainput')

var data = []


var showItem = false

function showItems() {
    if (showItem == false) {
        document.getElementById('itemdropdown').style.display = 'flex'
        showItem = true
    } else if (showItem == true) {
        document.getElementById('itemdropdown').style.display = 'none'
        showItem = false
    }
}


var forms = 0
var datainputs = 0

function addData(id) {
    for (var i = 0; i < data.length; i++) {
        if (data[i].id == id) {
            data[i].data = document.getElementById(`${id}input`).value
        }
    }
    dataInput.value = JSON.stringify(data)
    console.log("datainput", dataInput.value)
    for (var i = 0; i < dataInputs.length; i++) {
        dataInputs[i].value = JSON.stringify(data)
    }
}


function addDataRich(id) {
    for (var i = 0; i < data.length; i++) {
        if (data[i].id == id) {
            data[i].data = document.getElementById(`${id}`).getElementsByClassName('ql-editor')[0].innerHTML
            console.log(data[i].data)
        }
    }
    dataInput.value = JSON.stringify(data)
    console.log("datainput", dataInput.value)
    for (var i = 0; i < dataInputs.length; i++) {
        dataInputs[i].value = JSON.stringify(data)
    }
}

function addDataCaption(id) {
    for (var i = 0; i < data.length; i++) {
        if (data[i].id == id) {
            data[i].caption = document.getElementById(`${id}inputcap`).value
        }
    }
    dataInput.value = JSON.stringify(data)
    console.log("datainput", dataInput.value)
    for (var i = 0; i < dataInputs.length; i++) {
        dataInputs[i].value = JSON.stringify(data)
    }
}

function align(align, id) {
    document.getElementById(id).style.textAlign = align
    for (var i = 0; i < data.length; i++) {
        if (data[i].id == id) {
            data[i].align = align
        }
    }
}

function tab(tab, id) {
    if (tab == 'none') {
        document.getElementById(id).style.textIndent = '0px'
    } else if (tab == '1') {
        document.getElementById(id).style.textIndent = '30px'
    } else if (tab == '2') {
        document.getElementById(id).style.textIndent = '60px'
    }
    for (var i = 0; i < data.length; i++) {
        if (data[i].id == id) {
            data[i].tab = tab
        }
    }
}

function uploadImage(id) {
    const [file] = document.getElementById(`${id}input`).files
    if (file) {
        document.getElementById(`${id}`).src = URL.createObjectURL(file)
    }
    for (var i = 0; i < data.length; i++) {
        if (data[i].id == id) {
            data[i].data = document.getElementById(`${id}input`).files[0].name
        }
    }
    dataInput.value = JSON.stringify(data)
    for (var i = 0; i < dataInputs.length; i++) {
        dataInputs[i].value = JSON.stringify(data)
    }

}

function readVideo(id) {
    let file = document.getElementById(`${id}input`).files[0];
    let blobURL = URL.createObjectURL(file);
    document.getElementById(`${id}imagesource`).src = blobURL;
    for (var i = 0; i < data.length; i++) {
        if (data[i].id == id) {
            data[i].data = document.getElementById(`${id}input`).files[0].name
        }
    }
    dataInput.value = JSON.stringify(data)
    for (var i = 0; i < dataInputs.length; i++) {
        dataInputs[i].value = JSON.stringify(data)
    }
}

function headerImage(id) {
    const [file] = document.getElementById(`${id}input`).files
    if (file) {
        document.getElementById(`${id}`).src = URL.createObjectURL(file)
    }

}

function readAudio(id) {
    let file = document.getElementById(`${id}input`).files[0];
    let blobURL = URL.createObjectURL(file);
    document.getElementById(`${id}audiosrc`).src = blobURL;
    for (var i = 0; i < data.length; i++) {
        if (data[i].id == id) {
            data[i].data = document.getElementById(`${id}input`).files[0].name
        }
    }
    dataInput.value = JSON.stringify(data)
    for (var i = 0; i < dataInputs.length; i++) {
        dataInputs[i].value = JSON.stringify(data)
    }
}

function addBlock(item) {
    if (item == 'heading1') {
        var elid = generateString(8)
        editor.innerHTML += `
        <div style="width: 90%; margin: 20px auto;">
        <a onclick="deleteItem('${elid}')" style="padding-top: -10px; float: right;" class="postlist-item-button-delete">Delete</a>
            <p class="caption" style="margin-bottom: 4px;">Heading</p>
            <div style="width: calc(100% - 80px); margin: auto; border: 1px solid black; background-color: white; color: #323435; border-radius: 0px; padding: 40px;">
                <h1 id="${elid}">Heading Text</h1>
                <input type="text" class="item-input" id="${elid}input" onkeyup="document.getElementById('${elid}').innerText = document.getElementById('${elid}input').value; addData('${elid}');" placeholder="Heading Text...">
                <div style="display: flex; flex-direction: row; margin-top: 30px;">
                    <button class="align-button-start" onclick="align('left', '${elid}')"><img src="imgs/alignleft.svg" alt=""></button>
                    <button class="align-button" onclick="align('right', '${elid}')"><img src="imgs/alignright.svg" alt=""></button>
                    <button class="align-button" onclick="align('center', '${elid}')"><img src="imgs/aligncenter.svg" alt=""></button>
                    <button class="align-button-end" onclick="align('justify', '${elid}')"><img src="imgs/alignjustify.svg" alt=""></button>
                    
                </div>
            </div>
        </div>`
        data.push({ id: `${elid}`, type: 'heading1', data: '', align: '' })
    } else if (item == 'heading2') {
        var elid = generateString(8)
        editor.innerHTML += `
      <div style="width: 90%; margin: 20px auto;">
      <a onclick="deleteItem('${elid}')" style="padding-top: -10px; float: right;" class="postlist-item-button-delete">Delete</a>
          <p class="caption" style="margin-bottom: 4px;">Heading</p>
          <div style="width: calc(100% - 80px); margin: auto; border: 1px solid black; background-color: white; color: #323435; border-radius: 0px; padding: 40px;">
              <h2 id="${elid}">Heading Text</h2>
              <input type="text" class="item-input" id="${elid}input" onkeyup="document.getElementById('${elid}').innerText = document.getElementById('${elid}input').value; addData('${elid}');" placeholder="Heading Text...">
            <div style="display: flex; flex-direction: row; margin-top: 30px;">
                    <button class="align-button-start" onclick="align('left', '${elid}')"><img src="imgs/alignleft.svg" alt=""></button>
                    <button class="align-button" onclick="align('right', '${elid}')"><img src="imgs/alignright.svg" alt=""></button>
                    <button class="align-button" onclick="align('center', '${elid}')"><img src="imgs/aligncenter.svg" alt=""></button>
                    <button class="align-button-end" onclick="align('justify', '${elid}')"><img src="imgs/alignjustify.svg" alt=""></button>
                </div>
            </div>
      </div>`
        data.push({ id: `${elid}`, type: 'heading2', data: '', align: '' })
    } else if (item == 'heading3') {
        var elid = generateString(8)
        editor.innerHTML += `
      <div style="width: 90%; margin: 20px auto;">
      <a onclick="deleteItem('${elid}')" style="padding-top: -10px; float: right;" class="postlist-item-button-delete">Delete</a>
          <p class="caption" style="margin-bottom: 4px;">Heading</p>
          <div style="width: calc(100% - 80px); margin: auto; border: 1px solid black; background-color: white; color: #323435; border-radius: 0px; padding: 40px;">
              <h3 id="${elid}">Heading Text</h3>
              <input type="text" class="item-input" id="${elid}input" onkeyup="document.getElementById('${elid}').innerText = document.getElementById('${elid}input').value; addData('${elid}');" placeholder="Heading Text...">
                <div style="display: flex; flex-direction: row; margin-top: 30px;">
                    <button class="align-button-start" onclick="align('left', '${elid}')"><img src="imgs/alignleft.svg" alt=""></button>
                    <button class="align-button" onclick="align('right', '${elid}')"><img src="imgs/alignright.svg" alt=""></button>
                    <button class="align-button" onclick="align('center', '${elid}')"><img src="imgs/aligncenter.svg" alt=""></button>
                    <button class="align-button-end" onclick="align('justify', '${elid}')"><img src="imgs/alignjustify.svg" alt=""></button>
                </div>
            </div>
      </div>`
        data.push({ id: `${elid}`, type: 'heading3', data: '', align: '' })
    } else if (item == 'heading4') {
        var elid = generateString(8)
        editor.innerHTML += `
      <div style="width: 90%; margin: 20px auto;">
      <a onclick="deleteItem('${elid}')" style="padding-top: -10px; float: right;" class="postlist-item-button-delete">Delete</a>
          <p class="caption" style="margin-bottom: 4px;">Heading</p>
          <div style="width: calc(100% - 80px); margin: auto; border: 1px solid black; background-color: white; color: #323435; border-radius: 0px; padding: 40px;">
              <h3 id="${elid}">Heading Text</h3>
              <input type="text" class="item-input" id="${elid}input" onkeyup="document.getElementById('${elid}').innerText = document.getElementById('${elid}input').value; addData('${elid}');" placeholder="Heading Text...">
              <div style="display: flex; flex-direction: row; margin-top: 30px;">
                    <button class="align-button-start" onclick="align('left', '${elid}')"><img src="imgs/alignleft.svg" alt=""></button>
                    <button class="align-button" onclick="align('right', '${elid}')"><img src="imgs/alignright.svg" alt=""></button>
                    <button class="align-button" onclick="align('center', '${elid}')"><img src="imgs/aligncenter.svg" alt=""></button>
                    <button class="align-button-end" onclick="align('justify', '${elid}')"><img src="imgs/alignjustify.svg" alt=""></button>
                </div>
          </div>
      </div>`
        data.push({ id: `${elid}`, type: 'heading4', data: '', align: '' })
    } else if (item == 'paragraph') {
        var elid = generateString(8)
        editor.innerHTML += `
      <div style="width: 90%; margin: 20px auto;">
      <a onclick="deleteItem('${elid}')" style="padding-top: -10px; float: right;" class="postlist-item-button-delete">Delete</a>
          <p class="caption" style="margin-bottom: 4px;">Paragraph</p>
          <div style="width: calc(100% - 80px); margin: auto; border: 1px solid black; background-color: white; color: #323435; border-radius: 0px; padding: 40px;">
              <p id="${elid}">Paragraph Text</p>
              <input type="text" class="item-input" id="${elid}input" onkeyup="document.getElementById('${elid}').innerText = document.getElementById('${elid}input').value; addData('${elid}');" placeholder="Paragraph Text...">
              <div style="display: flex; flex-direction: row; margin-top: 30px;">
                    <button class="align-button-start" onclick="align('left', '${elid}')"><img src="imgs/alignleft.svg" alt=""></button>
                    <button class="align-button" onclick="align('right', '${elid}')"><img src="imgs/alignright.svg" alt=""></button>
                    <button class="align-button" onclick="align('center', '${elid}')"><img src="imgs/aligncenter.svg" alt=""></button>
                    <button class="align-button-end" onclick="align('justify', '${elid}')"><img src="imgs/alignjustify.svg" alt=""></button>
                    <div style="display: flex; flex-direction: row; margin-top: 0px; margin-left: 30px;">
                        <button class="align-button-start" onclick="tab('none', '${elid}')">No
                                Tab</button>
                        <button class="align-button" onclick="tab('1', '${elid}')">1</button>
                        <button class="align-button-end" onclick="tab('2', '${elid}')">2</button>

                    <div style="display: flex; flex-direction: row;">  

                    </div>
                </div>
                </div>
                
          </div>
      </div>`
        data.push({ id: `${elid}`, type: 'paragraph', data: '', align: '', tab: '' })
    } else if (item == 'image') {
        var elid = generateString(8)
        datainputs += 1
        editor.innerHTML += `
        <form action="/admin/uploadimage" method="POST" enctype="multipart/form-data">
            <input type="text" name="data" class="datainput" style="display: none;">
            <div style="width: 90%; display: block; margin: 20px auto;">
            <a onclick="deleteItem('${elid}')" style="padding-top: -10px; float: right;" class="postlist-item-button-delete">Delete</a>
                <p class="caption" style="margin-bottom: 4px;">Image</p>
                <div style="width: calc(100% - 80px); margin: auto; border: 1px solid black; background-color: white; color: #323435; border-radius: 0px; padding: 40px;">
                    <img id="${elid}" src="imgs/background-icon.svg" alt="your image" style="width: 50%; margin: auto; display: block; margin-bottom: 30px;" />
                    <input type="file" id="${elid}input" onchange="uploadImage('${elid}')" name="image" />
                    <button type="submit">Upload</button>
                    <p id="${elid}" style="display: none;">Paragraph Text</p>
                    <input type="text" class="item-input" style="margin-top: 20px;" id="${elid}inputcap" onkeyup="addDataCaption('${elid}');" placeholder="Caption...">
                </div>
            </div>
        </form>`
        forms += 1
        data.push({ id: `${elid}`, type: 'image', data: '', caption: '' })
    } else if (item == 'video') {
        data
        var elid = generateString(8)
        datainputs += 1
        editor.innerHTML += `
        <form action="/admin/uploadvideo" method="POST" enctype="multipart/form-data">
            <input type="text" name="data" class="datainput" style="display: none;">
            <div style="width: 90%; display: block; margin: 20px auto;">
            <a onclick="deleteItem('${elid}')" style="padding-top: -10px; float: right;" class="postlist-item-button-delete">Delete</a>
                <p class="caption" style="margin-bottom: 4px;">Video</p>
                <div style="width: calc(100% - 80px); margin: auto; border: 1px solid black; background-color: white; color: #323435; border-radius: 0px; padding: 40px;">
                    <video style="width: 100%; margin-bottom: 20px; border-radius: 15px;" controls>
                        <source id="${elid}imagesource" src="uploads/video.mp4">
                        Your browser does not support HTML video.
                    </video>
                    <input type="file" id="${elid}input" name="video" onchange="readVideo('${elid}')"  type="video/*" />
                    <button type="submit">Upload</button>
                </div>
            </div>
        </form>`
        forms += 1
        data.push({ id: `${elid}`, type: 'video', data: '' })
    } else if (item == 'audio') {
        var elid = generateString(8)
        datainputs += 1
        editor.innerHTML += `
        <form action="/admin/uploadaudio" method="POST" enctype="multipart/form-data">
            <input type="text" name="data" class="datainput" style="display: none;">
            <div style="width: 90%; display: block; margin: 20px auto;">
            <a onclick="deleteItem('${elid}')" style="padding-top: -10px; float: right;" class="postlist-item-button-delete">Delete</a>
                <p class="caption" style="margin-bottom: 4px;">Audio</p>
                <div style="width: calc(100% - 80px); margin: auto; border: 1px solid black; background-color: white; color: #323435; border-radius: 0px; padding: 40px;">
                    <audio controls style="margin-bottom: 10px;">
                                <source src="" id="${elid}audiosrc" type="audio/mp3">

                                Your browser does not support the audio element.
                            </audio>
                            <br>
                            <br>
                    <input type="file" id="${elid}input" name="audio" onchange="readAudio('${elid}')"  type="audio/*" />
                    <button type="submit">Upload</button>
                </div>
            </div>
        </form>`
        forms += 1
        data.push({
            id: `${elid}`,
            type: 'audio',
            data: ''
        })
    } else if (item == 'richtext') {
        var elid = generateString(8)

        elid = elid.replace(' ', '')
        editor.innerHTML += `
       <div style="width: 90%; margin: 20px auto; margin-top: 30px;">
            <a onclick="deleteItem('${elid}')" style="margin-top: -20px; float: right;" class="postlist-item-button-delete">Delete</a>
            <div id="${elid}" onkeyup="addDataRich('${elid}')">
                <p>Hello World!</p>
                <p>Some initial <strong>bold</strong> text</p>
                <p><br></p>
            </div>
        </div>`

        var quill = new Quill(`#${elid}`, {
            modules: {
                toolbar: toolbarOptions
            },
            theme: 'snow'
        });
        data.push({ id: `${elid}`, type: 'richtext', data: '' })
    }

    var inputs = document.getElementsByClassName('item-input')

    if (inputs.length != 0) {
        for (var i = 0; i < inputs.length; i++) {
            var elementid = inputs[i].id
            console.log("refilling input | id", elementid, elementid.slice(0, 8))
            document.getElementById(inputs[i].id).value = document.getElementById(elementid.slice(0, 8)).innerText

        }
    } else {
        console.log("Hello")
    }

    var imageinputs = document.getElementsByClassName('image-input')

    if (imageinputs.length != 0) {
        for (var i = 0; i < imageinputs.length; i++) {
            var elementid = imageinputs[i].id
            console.log(document.getElementById(imageinputs[i].id).files)

            document.getElementById(imageinputs[i].id).files = document.getElementById(imageinputs[i].id).files[0].name
        }
    } else {
        console.log("Hello")
    }

    console.log(data)
}
// for (var i = 0; i < data.length; i++) {
//     if (data) {
//         console.log(data)
//     }
//     var quill = new Quill(`#${data}`, {
//         modules: {
//             toolbar: toolbarOptions
//         },
//         theme: 'snow'
//     });
// }

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateString(length) {
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

// document.getElementById('editor').onmousedown = function(e) {
//     e = e || window.event;
//     var elementId = (e.target || e.srcElement).id;

//     // call your re-create function
//     if ((e.target || e.srcElement).className.includes('edit')) {
//         console.log(elementId);
//         document.getElementById('edittitle').innerText = `${elementId}`
//         console.log(document.getElementById(elementId).tagName)
//     }
//     // ...
// }