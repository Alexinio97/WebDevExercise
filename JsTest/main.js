var counter = 1;

function displaySteps(input)
{
    // create elements needed for display
    var paragraph = document.createElement("p");
    var newLineBr = document.createElement("br");
    var t = document.createTextNode("Step number " + counter + " - " + input);
    paragraph.appendChild(newLineBr); // add a new line for the paragraph after displaying the counter
    counter++;
    paragraph.appendChild(t); // add the text
    
    if(paragraph != null)
    {
        document.getElementById("stepsDisplay").appendChild(paragraph);
    }
    else
    {
        console.log("Paragraph is " + paragraph);
    }
}


// function for swaping array elements
function swap(input, index_A, index_B) {
    var temp = input[index_A];

    input[index_A] = input[index_B];
    input[index_B] = temp;
}


function Sorting(numArray,array_length)
{
    this.numArray = numArray;
    this.array_length = array_length;
}


//heapsort function
/* to create MAX  array */  
Sorting.prototype.heap_root = function(input, i){
    var left = 2 * i + 1;
    var right = 2 * i + 2;
    var max = i;

    if (left < this.array_length && input[left] > input[max]) {
        max = left;
    }

    if (right < this.array_length && input[right] > input[max])     
    {
        max = right;
    }

    if (max != i) {
        swap(input, i, max);
        this.heap_root(input, max);
    }
}



Sorting.prototype.heapSort = function(input) {
    
    this.array_length = input.length;

    for (var i = Math.floor(this.array_length / 2); i >= 0; i -= 1)      {
        this.heap_root(input, i);
    }

    for (i = input.length - 1; i > 0; i--) {
        swap(input, 0, i);
        this.array_length--;
        
        displaySteps(input);
        this.heap_root(input, 0);
    }
    return input;
}

// quick sort function
Sorting.prototype.quick_Sort = function (origArray) {
    
    if (origArray.length <= 1) { 
        return origArray;
    } else {

        var left = [];
        var right = [];
        var newArray = [];
        var pivot = origArray.pop();
        var length = origArray.length;

        for (var i = 0; i < length; i++) {
            if (origArray[i] <= pivot) {
                left.push(origArray[i]);
            } else {
                right.push(origArray[i]);
            }
            
        }
        displaySteps(origArray);
        return newArray.concat(this.quick_Sort(left), pivot,this.quick_Sort(right));
    }
}

Sorting.prototype.shellSort = function(arr){
    var increment = arr.length / 2;
    while (increment > 0) {
        for (let i = increment; i < arr.length; i++) {
            var j = i;
            var temp = arr[i];
    
            while (j >= increment && arr[j-increment] > temp) {
                arr[j] = arr[j-increment];
                j = j - increment;
            }
    
            arr[j] = temp;
        }
    
        if (increment == 2) {
            increment = 1;
        } else {
            increment = parseInt(increment*5 / 11);
        }
        displaySteps(arr);
    }
    return arr;
}


var numArray = []
function generateArray()
{
    var numberEntered = document.getElementById("number").value;
    console.log(numberEntered);
    
    var displayList = document.getElementById("DisplayList");
    var paragraph = document.createElement("p");

    
    for (let i=0; i< 10;i++)
    {
        numArray[i] = Math.floor((Math.random() * numberEntered) + 1); // this will add the random number between 1 and the limit to the array
        console.log("Number at pos: " + i +" is " + numArray[i]);
        var t = document.createTextNode(numArray[i] + ";");
        paragraph.appendChild(t);
    }
    

    displayList.appendChild(paragraph);
}


function sortHeap()
{
    counter = 1;
    document.getElementById("stepsDisplay").innerHTML="";

    document.getElementById("SortedList").innerHTML=""; // empty the div
    let heapObj = new Sorting(numArray,numArray.length);
    heapSorted = heapObj.heapSort(numArray);
    console.log("Sorted with heap Sort: " + heapSorted);


    var displayList = document.getElementById("SortedList");
    var paragraph = document.createElement("p");


    var t = document.createTextNode("Heap: " + heapSorted);
    paragraph.appendChild(t);
    displayList.appendChild(t);

    delete heapObj;
}

function sortShell()
{
    counter = 1;
    document.getElementById("stepsDisplay").innerHTML="";
    
    document.getElementById("SortedList").innerHTML=""; // empty the div
    let shellObj = new Sorting(numArray,numArray.length);
    shellSorted = shellObj.shellSort(numArray);
    console.log("Sorted with shell sort: " + shellSorted);

    var displayList = document.getElementById("SortedList");
    var paragraph = document.createElement("p");


    var t = document.createTextNode("Shell: " + shellSorted);
    paragraph.appendChild(t);
    displayList.appendChild(t);

    delete shellObj;

}

function sortQuick() 
{   
    counter = 1;
    document.getElementById("stepsDisplay").innerHTML="";

    document.getElementById("SortedList").innerHTML=""; // empty the div
    let quickObj = new Sorting(numArray,numArray.length);
    sorted = quickObj.quick_Sort(numArray);
    console.log("Sorted with quick Sort: " + sorted);

    var displayList = document.getElementById("SortedList");
    var paragraph = document.createElement("p");

    var t = document.createTextNode("Quick: " + sorted);
    paragraph.appendChild(t);
    displayList.appendChild(t);

    delete quickObj;
}


// function that will clear the list array
function emptyList()
{
    numArray = []; // empty the array
    document.getElementById("DisplayList").innerHTML="";
    document.getElementById("stepsDisplay").innerHTML="";
}



