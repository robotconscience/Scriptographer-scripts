/***************************************************
    MAKE A GRID OF STUFF
    - select an element (group, image, etc)
    and space it evenly 
    - use params to randomize the grid
***************************************************/

var w = 20;
var h = 20;
var ranScale = true;
var ranRotate = true;
var bMask = true;
var bRanColor = false;


var maxScale    = 2;
var minScale    = .5;

var grp = new Group();

var sel = activeDocument.selectedItems;

if (sel.length > 0){
    for (var i =0; i<sel.length; i++){
        grp.appendChild(sel[i]);
    }
    var width = grp.bounds.width;
    var height = grp.bounds.height;

    var components = 
    {
        across: { label:'across', value: w},
        down: { label:'down', value: h},
        ranScale: { label:'random scale', value: ranScale},
        minScale: { label:'min scale', value: minScale},
        maxScale: { label:'max scale', value: maxScale},
        ranRotate: { label:'random rotate', value: ranRotate},
        bMask: { label:'mask results', value: bMask},
        bRanColor: { label:'randomize color', value: bRanColor}
    };

    var values = Dialog.prompt('Grid it up', components);

    ranScale = values.ranScale;
    ranRotate = values.ranRotate;
    minScale = values.minScale;
    maxScale = values.maxScale;
    bMask = values.bMask;
    bRanColor = values.bRanColor;

    for (var y=0; y<values.down; y++){
        for (var x=0; x<values.across; x++){
            var n = grp.clone();
            n.position.x = width*x + width/2;
            n.position.y = height*y + height/2;
            if (ranRotate) n.rotate(Math.random()*360, new Point(n.bounds.x + width/2, n.bounds.y + height/2));
            if (ranScale) n.scale(Math.random()*maxScale+minScale);
            if (bRanColor){
                for (var j=0; j<n.children.length; j++){
                    n.children[j].fillColor = new CMYKColor(Math.random(),Math.random(),Math.random(),Math.random());
                }
            }
            if (bMask){
                var mask = new Path.Rectangle(new Point(width*x, height*y), new Size(width, height));
                n.appendChild(mask);
                n.clipped = true;
                mask.clipMask = true;
            }   
        };
    };
} else {
    Dialog.alert('try again!', 'you gotta select some stuff first, bro.');
};

