# GA_Proj1_Tetris

Deployed site: https://proj1-tetris.netlify.app/

### Objective
Tetris: To direct falling blocks to form complete horizontal lines and get points. Once the blocks touch the top, you lose!

### Project Objective
The purpose of the project was to create a game app using Javascript.

### App Features
1. Point and level system, with blocks falling at increasing speed.
2. Preview of block drop position
3. Game Controls:
  a. Right/Left buttons: Shift blocks right/left
  b. Down button: Increase block's falling speed
  c. Up button: Rotate blocks clockwise
  d. Spacebar: Hard drop

### How the App Works
Upon clicking start, a random tetris block falls. The user can then use the different arrow buttons and spacebar to play the game of tetris.

![Screenshot 2022-01-25 at 3 22 45 PM](https://user-images.githubusercontent.com/65413578/151395344-9872bbdb-79e7-47cf-974c-633032fb0065.png)

### Codes and Struggles
Finding the logic and how to do the different checks were my greatest struggle in this project.
1. How do we check that a block can be shifted
2. What happens when a block is rotated how do we check that it can be rotated
3. How do you check that you have lost
4. How to clear the lines
5. How do we find the hard drop position such that it is right at the bottom of the column but will not pass through any blocks above

### Possible Extensions
1. Adding the keep block function
2. Finding the lines cleared at each block drop to award combo points
