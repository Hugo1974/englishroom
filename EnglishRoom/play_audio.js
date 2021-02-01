async function playSound(call, file, lang) {

    console.log(call, + "\n\n" + file + "\n\n" + lang);
    console.log("https://www.linguee.com/mp3/" + file + ".mp3");

    var audio_file = "https://www.linguee.com/mp3/" + file + ".mp3";

    var audio = new Audio(audio_file);  
    
    audio.type = "audio/mp3";

    try {
        await audio.play();
        console.log("Playing...");
        } catch (err) {
        console.log("Failed to play..." + error);
        }

    }
    

    
