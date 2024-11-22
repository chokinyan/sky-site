var dX=12, dY=14; 
var x=300, y=300;
var z=200, longueur=150;
var scorejoueur=0, scoreia=0;
var gameOver=false;
let raquettes;

function preload() {
  raquettes = loadImage('data/Raquettes.jpg');
}

function setup() {

  createCanvas(1000,800);                            
  background(0);                             // couleur noire du fond
  textSize(50);
  fill(0,255,0);
  text("PONG GAME",350,50);
  image(raquettes,250,10,70,70);
  image(raquettes,675,10,70,70);
 
}

function draw() {
  dessinerTerrain();
  dessinerRaquette();
  dessinerBalle();
  dessinerScore();
  bougerBalle();
  bougerRaquette();
  rebondir();
}

function dessinerTerrain()
{
  // code terrain
  stroke(255);                   
  strokeWeight(10);              
  fill(0,0,255);                 
  rect(100,150,800,600);         
  line(500,150,500,750);         
}

function dessinerRaquette()
{
  // code raquette
  strokeWeight(1);              
  fill(255);                     
  rect(150,z,25,longueur);            
}

function dessinerBalle()
{
  // code balle
  noStroke();                    
  fill(255,0,0);                 
  ellipse(x,y,30,30);           
}

function dessinerScore()
{
    // code score
    textSize(30);                  
    fill(255);                     
    text("SCORE:",425,130);        
    textSize(70); 
    text(scorejoueur,400,250);
    text(scoreia,550,250);
}

function bougerBalle() 
{
    x = x + dX;
    y = y + dY;
} 

function bougerRaquette()
{
  z = mouseY;
  
    if (z<=150)
    {
    z=150;
    }
    if (z>= 750-longueur)
    {
        z=750-longueur;
    }
}   

function mouseClicked()
{
    if (mouseButton==LEFT && gameOver==true)
    {
    scoreia=scorejoueur=0;
    y=x=400;
    gameOver=false;
    loop();
    }
}

function keyPressed()
{
    if (key == 'R' && gameOver==true)
    {
    scoreia=scorejoueur=0;
    y=x=400;
    gameOver=false;
    loop();
    }
}

function rebondir() 
   {
    // si la balle touche le bord intérieur droit du terrain et que le déplacement horizontal est positif 
      if (x > 880 && dX > 0)  
      {  
      dX = -dX; // inverser la valeur du déplacement horizontal
      scoreia++;
      print("scoreia="+scoreia);
      }
   
   
   // si la balle touche le bord intérieur bas du terrain et que le déplacement vertical est positif 
     if (y > 730 && dY > 0) 
     {    
     dY = -dY; // inverser la valeur du déplacement vertical 
     }
   
   
    // si la balle touche le bord intérieur haut du terrain et que le déplacement vertical est négatif 
    if (y < 170 && dY < 0)  
    {   
    dY = -dY; // inverser la valeur du déplacement vertical 
    }
  
  
    /* si la balle touche la raquette c'est à dire: si la position horizontale de son bord gauche est inférieure à la position 
    horizontale du bord droit de la raquette et que sa position verticale  est supérieure à la position verticale de la raquette et que
    sa position verticale est inférieure à (la position de la raquette + la longueur de la raquette)*/
    if (x<190 && y>z && y<z+longueur)  
    {   
      dX = -dX;       // inverser la valeur du déplacement horizontal
      scorejoueur ++;
      print("scorejoueur="+scorejoueur);
    } 
  
  
    if (x < 175) //  si la balle dépasse la valeur verticale de la position du bord droit de la raquette alors arréter la répétition de la méthode draw() et afficher dans la console: GAME OVER
    {  
      noLoop();  
      print("GAME OVER"); 
      textSize(100); 
      fill(255,0,0);
      text("GAME OVER",200,500);
      textSize(25); 
      text("Appuyez sur R ou clic droit souris pour rejouer",205,550);
      gameOver=true;
     }          
}