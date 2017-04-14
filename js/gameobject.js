/*
** creates a new inline DIV element representing a game_element
**
** within the DIV you specify the following objects
** id                - (string) objectid for the element
** url_spriteobject  - (string) url to sprite resource
**
** x       - (int) x position to place the element
** y       - (int) y position to place the element
** width   - (int) width of the element
** heigth  - (int) heigth of the element
** cell_x  - (int) sprite cell x position
** cell_y  - (int) sprite cell y position
** visible - (boolean) determines if to show the image.
*/

function gameobject(id , url_spriteobject , x , y , width, height , cell_x , cell_y , visible) {
     var IsMoving      = false;
     var width;
     var height;
     var _animations   = new Array();
     this.addAnimation = addAnimation;

     this.id = id;
     this.elementid    = this.id +'_element';
     
     this.GetAnimationByID  = GetAnimationByID;
     this.PlayAnimation     = PlayAnimation;
     this.StopAllAnimations = StopAllAnimations;
     
     this.DisposeObject = DisposeObject;

     
     this.IsMoving   = IsMoving;     
     this.beforeMove = window.event;
     this.afterMove  = window.event;
     
     this.x = x;
     this.y = y;
     this.width  = width;
     this.height = height;
     this.currentAnimation;
     
     var new_element = document.createElement('DIV');
     new_element.setAttribute('id' , id + '_element');
     document.body.appendChild(new_element);
     
     var game_element = document.getElementById(new_element.id);
      
     game_element.style.position = 'absolute';
     game_element.style.width    = width  + 'px';
     game_element.style.height   = height + 'px';
     game_element.style.left     = x + 'px';
     game_element.style.top      = y + 'px';

     if (url_spriteobject) game_element.style.backgroundImage     = 'url('+ url_spriteobject +')';      
     if (cell_x | cell_y)  game_element.style.backgroundPosition  = '-'+ cell_x +'px '+ cell_y +'px';
     if (visible==false) { 
       game_element.style.visibility = 'Hidden' 
     } else {
       game_element.style.visibility = 'Visible' 
     }
     

     function addAnimation(panimation, id)
     {
        _animations[ _animations.length ] = panimation;
        _animations[ _animations.length - 1 ].id = id;
        _animations[ _animations.length - 1 ].LoopAnimation = panimation.LoopAnimation;
        _animations[ _animations.length - 1 ].Parent = this;
     }
     
     function GetAnimationByID(animationID)
     {
        for (i=0 ; i<=(_animations.length -1); i++)
        {
            if (_animations[i].id == animationID)
                return _animations[i];
        }
        
        alert('Error:GetAnimationByID, animationID ' + animationID + ' not found');

        return null;
     }

     function PlayAnimation(animationID , Interval) {
       this.GetAnimationByID(animationID).Play( this ,  Interval);
       this.IsPlaying = true;
     }
     
     
     function StopAllAnimations()
     {
        if (this.currentAnimation) {
           if (this.currentAnimation.IsPlaying)
               this.currentAnimation.Stop();
        }        
     }
     
     function DisposeObject()
     {
        game_element.style.visibility = 'Hidden';
        _animations   = null;
     }
     
     


}