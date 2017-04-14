function animation(id,parent) {
     var _frames = new Array();
     var intervalID;
     var IsPlaying     = false;
     var loopanimation = true;
     
     this.id             = id;
     this.frames         = _frames;
     this.currentFrame   = 0;
     this.addFrame       = addFrame;
     this.Parent         = parent;
     this.IsPlaying      = IsPlaying;
     this.LoopAnimation  = loopanimation;

     this.Play  = Play;
     this._play = _play;
     this.Stop  = Stop;
         
     function addFrame(offsetx,offsety)
     {
        _frames[ _frames.length ] = new frame( offsetx , offsety , this);
     }

     function frame(x, y , parent) {
       this.x = x;
       this.y = y;
       this.parent = parent;
     }     

     function Play(game_object, Interval) {
        this.Parent.currentAnimation = this;
        intervalID = window.setInterval( _play, Interval, this.Parent);

        this.IsPlaying = true;
     }

     function Stop()
     {
        if (intervalID) {
           this.IsPlaying = false;
           window.clearInterval(intervalID);
        }        
     }
     
     function _play(game_object)
     {
       var currAnim = game_object.currentAnimation;
       
       if (currAnim.currentFrame<(currAnim.frames.length-1))
       {
         currAnim.currentFrame++;
       } else {

         if (!currAnim.LoopAnimation)
         {
           Stop();
           game_object.DisposeObject();
         } else {
           currAnim.currentFrame = 0; // 0 = note the stopping image, when not animating
         }
       }
     }
     
     

}
