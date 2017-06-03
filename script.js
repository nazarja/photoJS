// Declare Variables and Select Elements
const inputs = document.querySelectorAll('.sliders input');
const mixBlendModes = document.querySelectorAll('.mix-blend-mode');
const borderStyles = document.querySelectorAll('.border-styles');
const textStyles = document.querySelectorAll('.font-select');
const originalImage  = document.getElementById('originalImage');
const hideImage  = document.getElementById('hideImage');
const text = document.querySelector('#text-1');
let text2 = document.querySelector('#text-2');
const inputBox= document.getElementById('input-box');
const image = document.getElementById('image');
let image2 = document.getElementById('image-2');
const scaleX = document.getElementById('scaleX');
const scaleY = document.getElementById('scaleY');
const dropDownShapes = document.querySelector('.dropdown-shapes');
const shapes = document.querySelectorAll('.shapes');
let suffix;
let mirror = 1;
let flip = 1;
let count1 = -1;
let count2 = -1;

if (window.innerWidth < 1370) {
    const body = document.getElementById("body");
    const rightDiv = document.querySelector(".right-div");
    body.style.width = "920px";
    body.style.margin = "auto 0";
    rightDiv.style.height = "675px";
    originalImage.style.right = "400px";
}


// Create Event Listeners for Groups
inputs.forEach(input => input.addEventListener('click', handleUpdate));
inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));
mixBlendModes.forEach(mixBlendMode=> mixBlendMode.addEventListener('click', changeMixBlendMode));
borderStyles.forEach(borderStyle => borderStyle.addEventListener('click', changeBorderStyles));
textStyles.forEach(textStyle => textStyle.addEventListener('click', changeTextStyle));
shapes.forEach(shape => shape.addEventListener('click', changeClipPathShape));

// Set Text & Original & Shapes - display to 'none' 
text.style.display = 'none';
originalImage.style.display = 'none';
dropDownShapes.style.display = 'none';

// When Sliders Values Change, Update the CSS Variables
function handleUpdate() {
    suffix = this.dataset.sizing || "";
    document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
    this.nextElementSibling.innerHTML = this.value + suffix;
    if (this.nextElementSibling.classList == "noSuffix") {
        this.nextElementSibling.innerHTML = "";
    };
}

// Change the Font Style
function changeTextStyle() {
    document.documentElement.style.setProperty('--font', this.value );
}
// Set the Border Style
function changeBorderStyles() {
    document.documentElement.style.setProperty('--border-styles', this.value );
}
// Set Mix Blend Mode Styles to Overlay
function changeMixBlendMode() {
    document.documentElement.style.setProperty('--mix-blend-mode', this.value );
}
// Set Clip Path Shape
function changeClipPathShape() {
    const shape = this.dataset.shape || "";
    document.documentElement.style.setProperty('--webkit-clip-path', shape);
    document.documentElement.style.setProperty('--clip-path', shape);
    dropDownShapes.style.display = 'none';
}

// Show Original image on toggle click for comparison
function showOriginal() {
    const showOriginalBtn = document.querySelector('#show-original');
    if (originalImage.style.display == 'none') {
        originalImage.style.display = 'block';
        showOriginalBtn.style.color = '#CD343A';
      
    }
    else {
        originalImage.style.display = 'none';
        showOriginalBtn.style.color = '#ededed';
    } 
}

function toggleMirror() {
    if (mirror == 1) {
        document.documentElement.style.setProperty('--scaleX', -1);
        mirror = -1;
        scaleX.value = -1;
    }
    else {
        document.documentElement.style.setProperty('--scaleX', 1);
        mirror = 1;
        scaleX.value = 1;
    }
}

function toggleFlip() {
    if (flip == 1) {
        document.documentElement.style.setProperty('--scaleY', -1);
        scaleY.value = -1;
        flip = -1;
    }
    else {
        document.documentElement.style.setProperty('--scaleY', 1);
        flip = 1;
        scaleY.value = 1;
    }
}

function toggleShapes() {
    if (dropDownShapes.style.display == 'none') {
        dropDownShapes.style.display = 'block';
    }
    else {
        dropDownShapes.style.display = 'none';
    } 
}

// Add Text
function addText() {
    let textContent = document.getElementById('text-content');
    let temp1  = '<span class="text-block-1"> '+ textContent.value + '</span>';
    let temp2  = '<span class="text-block-2"> '+ textContent.value + '</span>';
    text.innerHTML  +=  temp1;
    text2.innerHTML += temp2;
    text.style.display = 'block';
    textContent.value = "";
    count1 +=  1;
    count2 +=  1;
}

// Remove Last Text
function removeText() {
    let textBlocks1 = document.querySelectorAll('.text-block-1');
    let textBlocks2 = document.querySelectorAll('.text-block-2');
    for (let i = 0; i < textBlocks1.length; i++) {
        if ( i == count1) {
            textBlocks1[i].remove();
            count1 -= 1;
        }
    }
     for (let i = 0; i < textBlocks2.length; i++) {
        if ( i == count2) {
            textBlocks2[i].remove();
            count2 -= 1;
        }
    }
}

// Toggle Text On and Off
function toggleText() {

    if (text.style.display == 'none') {
            text.style.display = 'block';
            text2.style.display = 'block';
        }
        else {
            text.style.display = 'none';
            text2.style.display = 'none';
        } 
}

// Full Size Image On and Off
function fullSize() {
    const imageFullSize = document.getElementById('image-full-size');
    imageFullSize.style.display = "block";
    imageFullSize.addEventListener("click", function() {
        imageFullSize.style.display = "none";
    });
}

function fullSizeClose() {
    imageFullSize.style.display = "none";
}

// Set Image in URL/Source Box
function source() {
    image.src = inputBox.value;
    originalImage.src = inputBox.value;
    image2.src = inputBox.value;
    inputBox.value = " ";
}

// Reset the Overlay Gradients to none;
function resetOverlay() {
    document.documentElement.style.setProperty('--radial-gradient-overlay-1', "none" );
    document.documentElement.style.setProperty('--radial-gradient-overlay-2', "none" );
    document.documentElement.style.setProperty('--linear-gradient-overlay-1', "none" );
    document.documentElement.style.setProperty('--linear-gradient-overlay-2', "none" );
    document.documentElement.style.setProperty('--border-styles', "none" );
}

function resetBlendMode() {
      document.documentElement.style.setProperty('--mix-blend-mode', 'none');
}

// reset All Sliders
function resetAll() {
    for (let i = 0; i < inputs.length; i++) {
        suffix = inputs[i].dataset.sizing || "";
        inputs[i].value = inputs[i].defaultValue;
        document.documentElement.style.setProperty(`--${inputs[i].name}`, inputs[i].defaultValue + suffix );
        inputs[i].nextElementSibling.innerHTML = inputs[i].defaultValue + suffix;
        toggleText();
        resetOverlay();
    }
    document.documentElement.style.setProperty('--clip-path', "none");
}

// JavaScript Color Picker
const colors = jsColorPicker('input.color', {
    customBG: '#222',
    readOnly: true,
    // patch: false,
    init: function(elm, colors) { // colors is a different instance (not connected to colorPicker)
        elm.style.backgroundColor = elm.value;
        elm.style.color = colors.rgbaMixCustom.luminance > 0.22 ? '#222' : '#ddd';
         color = elm.value;
    }
});


