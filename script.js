var API_ENDPOINT_Translate = "https://mh3n67j9d2.execute-api.ap-south-1.amazonaws.com/default"
var API_ENDPOINT_Speech = "https://8z23jfmrf2.execute-api.ap-south-1.amazonaws.com/speech_convert"
var isPlaying = false;
var speech_text = " "
var translate_text=""


function input_action(){

	translate_text = $('#input_text').val().replace(/ +/g, " ").trim();
	//console.log(translate_text)

	var inputData = {
		"voice_input": $('#voiceSelectedInput option:selected').val(),
		"voice_output": $('#voiceSelectedOutput option:selected').val(),
		'text': translate_text
	}

	if (translate_text == ""){
		document.getElementById("output_text").textContent="";
		document.getElementById("sayButton").style.display="none"
	}
	else{
		document.getElementById("sayButton").style.display="block"
		if ($('#voiceSelectedInput option:selected').val()==$('#voiceSelectedOutput option:selected').val())
		{
			document.getElementById("output_text").textContent=translate_text
		}
		else{
			$.ajax({
				      url: API_ENDPOINT_Translate,
				      type: 'POST',
				      data:  JSON.stringify(inputData)  ,
				      contentType: 'application/json; charset=utf-8',
				      success: function (response) {
								document.getElementById("output_text").textContent=response;
							//	console.log(response)
								if (isPlaying)
								{
									sound()
								}
				      },
				      error: function () {
				          if(alert('error')){}
							else    window.location.reload(); 
				      }
				  });
		}
	}
}


document.getElementById("sayButton").onclick = function(){

	//console.log(speech_text)
	if (isPlaying) {
	    sound()
	} 
	else {
		var inputData = {
			"voice": $('#voiceSelectedOutput option:selected').val(),
			'text': $('#output_text').val()
		};
		document.getElementById("sayButton").src="img/volume_down.png"
		if (speech_text==$('#output_text').val()){
			sound()
		}
		else{
				$.ajax({
			      url: API_ENDPOINT_Speech,
			      type: 'POST',
			      data:  JSON.stringify(inputData) ,
			      contentType: 'application/json; charset=utf-8',
			      success: function (response) {
			      		//	console.log(response)
							jQuery.each(response, function(i,data) {
								var player = "<audio controls><source src='" + data['url'] + "' type='audio/mpeg'></audio>"
								 if (data["url"] === undefined){
									document.getElementById("sayButton").src="img/volume_up.png"
								 } 
								 else{
								 		document.getElementById("audio").src = data['url'];
								 		sound()
								 	}
							})
			      },
			      error: function (error) {
			      	//console.log(error)
			          alert("error");
			      }
			  });
		}
	}
}


function sound(){
	if (isPlaying) {
		document.getElementById("audio").pause()
	    isPlaying = false;
	    document.getElementById("sayButton").src="img/volume_up.png"	
	}
	else{
		document.getElementById("audio").play() 
		isPlaying = true;
		speech_text=$('#output_text').val()
		document.getElementById("sayButton").src="img/volume_down.png"	
	}
}