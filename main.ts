// Smart Water Reminder Prototype
// micro:bit V2 final polished version
 
let cups = 0
let goal = 8
let lastDrink = input.runningTime()
let remindTime = 1800000 // 30 minutes. For quick demo, change this to 10000.
let reminderActive = false
 
function startupSound() {
    music.playTone(392, 70)
    basic.pause(20)
    music.playTone(523, 70)
    basic.pause(20)
    music.playTone(659, 140)
}
 
function reminderSound() {
    // Gentle hydration reminder sound
    music.playTone(440, 70)
    basic.pause(40)
    music.playTone(440, 70)
    basic.pause(40)
    music.playTone(523, 120)
}
 
function drinkSound() {
    // Water intake recorded sound
    music.playTone(659, 50)
    basic.pause(20)
    music.playTone(880, 80)
}
 
function successSound() {
    // Daily goal reached sound
    music.playTone(523, 60)
    basic.pause(15)
    music.playTone(659, 60)
    basic.pause(15)
    music.playTone(784, 60)
    basic.pause(15)
    music.playTone(1047, 200)
}
 
function resetSound() {
    // Reset sound
    music.playTone(784, 70)
    basic.pause(20)
    music.playTone(523, 70)
    basic.pause(20)
    music.playTone(330, 130)
}
 
function shakeSound() {
    // Game-style encouragement sound
    music.playTone(659, 60)
    basic.pause(15)
    music.playTone(784, 60)
    basic.pause(15)
    music.playTone(988, 60)
    basic.pause(15)
    music.playTone(1319, 140)
}
 
function dropAnimation() {
    basic.showLeds(`
        . . # . .
        . # # # .
        # # # # #
        # # # # #
        . # # # .
    `)
    basic.pause(120)
 
    basic.showLeds(`
        . . . . .
        . . # . .
        . # # # .
        # # # # #
        . # # # .
    `)
    basic.pause(120)
 
    basic.clearScreen()
}
 
function cupAnimation() {
    basic.showLeds(`
        . # # # .
        # . . . #
        # . . . #
        # . . . #
        . # # # .
    `)
    basic.pause(120)
 
    basic.showLeds(`
        . # # # .
        # . # . #
        # . # . #
        # # # # #
        . # # # .
    `)
    basic.pause(120)
}
 
function progressBar() {
    basic.clearScreen()
 
    if (cups >= 1) led.plot(0, 4)
    if (cups >= 2) led.plot(1, 4)
    if (cups >= 3) led.plot(2, 4)
    if (cups >= 4) led.plot(3, 4)
    if (cups >= 5) led.plot(4, 4)
    if (cups >= 6) led.plot(1, 3)
    if (cups >= 7) led.plot(2, 3)
    if (cups >= 8) led.plot(3, 3)
 
    basic.pause(700)
}
 
function startup() {
    startupSound()
    basic.showIcon(IconNames.Heart)
    basic.pause(250)
    basic.showString("SIP")
    basic.showIcon(IconNames.SmallHeart)
}
 
function remindDrink() {
    reminderActive = true
 
    reminderSound()
    dropAnimation()
 
    basic.showString("SIP")
    basic.showIcon(IconNames.Umbrella)
 
    lastDrink = input.runningTime()
    reminderActive = false
}
 
function recordDrink() {
    if (cups >= goal) {
        successSound()
        basic.showIcon(IconNames.Happy)
        basic.showString("DONE")
        return
    }
 
    cups += 1
    lastDrink = input.runningTime()
    reminderActive = false
 
    drinkSound()
    basic.showString("+")
    basic.showNumber(cups)
    cupAnimation()
    progressBar()
 
    if (cups >= goal) {
        successSound()
        basic.showIcon(IconNames.Happy)
        basic.showString("DONE")
    } else {
        basic.showIcon(IconNames.Yes)
    }
}
 
function showProgress() {
    basic.showNumber(cups)
    basic.showString("OF")
    basic.showNumber(goal)
    progressBar()
 
    if (cups >= goal) {
        basic.showIcon(IconNames.Happy)
    } else if (cups >= 5) {
        basic.showString("GO")
    } else {
        basic.showIcon(IconNames.Heart)
    }
}
 
function resetDay() {
    cups = 0
    lastDrink = input.runningTime()
    reminderActive = false
 
    resetSound()
    basic.showString("RST")
    basic.showIcon(IconNames.Yes)
}
 
function encouragement() {
    shakeSound()
 
    if (cups >= goal) {
        basic.showString("WIN")
    } else if (cups >= 5) {
        basic.showString("GO")
    } else {
        basic.showIcon(IconNames.Heart)
    }
}
 
startup()
 
basic.forever(function () {
    if (!reminderActive && input.runningTime() - lastDrink > remindTime) {
        remindDrink()
    }
})
 
input.onButtonPressed(Button.A, function () {
    recordDrink()
})
 
input.onButtonPressed(Button.B, function () {
    showProgress()
})
 
input.onButtonPressed(Button.AB, function () {
    basic.showString("T")
    basic.showNumber(goal)
})
 
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    resetDay()
})
 
input.onGesture(Gesture.Shake, function () {
    encouragement()
})
