/*Create a class named Video. The class should be constructed with the following parameters:
title (a string)
uploader (a string, the person who uploaded it)
time (a number, the duration of the video - in seconds)
Create a method called watch() which displays a string as follows:
“uploader parameter watched all time parameter of title parameter!”
Instantiate a new Video instance and call the watch() method.
Instantiate a second Video instance with different values.
Bonus: Use an array to store data for five Video instances (ie. title, uploader, time)
Think of the best data structure to save this information within the array.
Bonus: Loop through the array to instantiate those instances.*/

class Video {
  constructor(title, uploader, time) {
    this.title = title;
    this.uploader = uploader;
    this.time = time;
  }
  watch() {
    console.log(`${this.uploader} watched all ${this.time} of ${this.title}`);
  }
}

const videoViral = new Video('The 10 viral video', 'Andrew Black', 60);
videoViral.watch();
const videoBW = new Video('The Best and Worst', 'Lily Black', 50);
videoBW.watch();

const videos = [{ title: 'Bradley', uploader: 'Bradley Bouley', time: 30 },
                { title: 'Chloe', uploader: 'Chloe Alnaji', time: 50 },
                { title: 'Jonathan', uploader: 'Jonathan Baughn', time: 29 },
                { title: 'Michael', uploader: 'Michael Herman', time: 45 },
                { title: 'Robert', uploader: 'Robert Hajek', time: 60 }];