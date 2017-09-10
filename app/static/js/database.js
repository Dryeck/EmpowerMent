var config = {
	// apiKey: "AIzaSyAIgL8eg_W0JrSKQT3TcxNw_Z1QmFQjjGk",
	// authDomain: "medhacks-project.firebaseapp.com",
	// databaseURL: "https://medhacks-project.firebaseio.com",
	// projectId: "medhacks-project",
	// storageBucket: "bucket.appspot.com",
	// messagingSenderId: "773916678395"
	apiKey: "AIzaSyBqCoDMs8dmRMuT8l2W_ruxBznFs1c8HJU",
	authDomain: "painpals-medhacks2017.firebaseapp.com",
	databaseURL: "https://painpals-medhacks2017.firebaseio.com",
	projectId: "painpals-medhacks2017",
	storageBucket: "painpals-medhacks2017.appspot.com",
	messagingSenderId: "264367990555"
};
firebase.initializeApp(config);
var database = firebase.database();

function inputMentee(email, password, name, bio, medications) {
	var userId = database.ref().child('mentees').push().key;
	database.ref('mentees/' + userId).set({
		email: email,
		password: password,
		name: name,
		bio: bio,
		medications: medications
	});
}

function inputMentor(email, password, name, bio, medications) {
	var userId = database.ref().child('mentors').push().key;
	database.ref('mentors/' + userId).set({
		email: email,
		password: password,
		name: name,
		bio: bio,
		medications: medications
	});
}

function getMenteeBio(id) {
	return database.ref('/mentees/' + id).once('value').then(function(snapshot) {
	  	var bio = (snapshot.val() && snapshot.val().bio) || 'Anonymous';
	  	return bio;
	});
}

function getMentorBios() {
	return database.ref().child('/mentors').once('value').then(function(key) {
		var bios = []
		for (var val in key.val()) {
			var obj = new Object();
			obj.id = val;
			obj.bio = key.val()[val]['bio'];
			bios.push(obj);
		}
		return(bios);
	});
}
function test() {
	var one = ['Hi', "it", "is", "me", "jared"];
	var two = ["This", "is", "different"];
	var union = [...new Set([...one, ...two])];
	console.log(union);
	for(var i = 0; i < union.length; i++) {
		union[i] = union[i].toLowerCase();
	}
	console.log(union);
	union = union.splice() ['hi'];
	console.log(union);
	console.log("hi.".slice(2,3));
}
var uselessWords = ["a", "aboard", "about", "above", "according", "accordingly", "across", "actual", "actually", "additional", "additionally", "after", "again", "against", "all", "almost", "along", "alongside", "also", "although", "always", "am", "amid", "amidst", "among", "amongst", "an", "and", "another", "anti", "any", "anybody", "anyone", "anything", "anyway", "apparent", "apparently", "are", "around", "as", "astride", "at", "atop", "away", "barring", "be", "because", "been", "before", "behind", "below", "beneath", "beside", "besides", "between", "beyond", "both", "but", "by", "can", "cannot", "can't", "certain", "certainly", "circa", "clear", "clearly", "commonly", "comparable", "comparative", "comparatively", "concerning", "consequent", "consequently", "considering", "contrarily", "conversely", "could", "couldn't", "cum", "despite", "did", "didn't", "different", "do", "does", "doesn't", "done", "down", "during", "each", "eight", "eighteen", "eighteenth", "eighth", "eightieth", "eighty", "either", "eleven", "eleventh", "elsewhere", "equally", "especially", "even", "every", "everybody", "everyone", "everything", "evident", "evidently", "except", "excepting", "excluding", "few", "fifteen", "fifteenth", "fifth", "fiftieth", "fifty", "finally", "first", "five", "following", "for", "fortieth", "forty", "four", "fourteen", "fourteenth", "fourth", "from", "further", "furthermore", "generally", "get", "gets", "getting", "go", "going", "gone", "got", "had", "has", "have", "he", "hence", "henceforth", "her", "here", "hers", "herself", "him", "himself", "his", "honestly", "how", "however", "I", "if", "I'll", "I'm", "important", "in", "incidentally", "including", "inside", "instead", "into", "is", "isn't", "it", "its", "it's", "itself", "I've", "just", "less", "likely", "likewise", "little", "many", "may", "me", "meanwhile", "might", "mine", "minus", "more", "moreover", "most", "much", "must", "my", "myself", "namely", "near", "nearly", "neither", "never", "nevertheless", "next", "nine", "nineteen", "nineteenth", "ninetieth", "ninety", "ninth", "no", "nobody", "none", "nonetheless", "nor", "not", "nothing", "notwithstanding", "now", "of", "off", "often", "on", "once", "one", "only", "onto", "or", "other", "others", "otherwise", "our", "ours", "ourselves", "out", "outside", "over", "particular", "particularly", "per", "plus", "prior", "provided", "rather", "re", "really", "regard", "regarding", "regardless", "relatively", "same", "seem", "seemingly", "seems", "seven", "seventeen", "seventeenth", "seventh", "seventieth", "seventy", "several", "she", "should", "similar", "similarly", "since", "six", "sixteen", "sixteenth", "sixth", "sixtieth", "sixty", "small", "so", "some", "somebody", "someone", "something", "soon", "specific", "specific", "specifically", "still", "subsequent", "subsequently", "such", "ten", "tenth", "than", "that", "the", "their", "theirs", "them", "themselves", "then", "there", "thereafter", "therefore", "these", "they", "third", "thirteen", "thirteenth", "thirtieth", "thirty", "this", "those", "though", "three", "through", "throughout", "thru", "thus", "till", "to", "together", "too", "toward", "towards", "truly", "twelfth", "twelve", "twentieth", "twenty", "twice", "two", "ultimately", "under", "underneath", "undoubtedly", "unless", "unlike", "until", "up", "upon", "us", "versus", "very", "via", "vis-a-vis", "vs", "was", "way", "we", "well", "went", "were", "what", "whatever", "when", "whenever", "where", "whereas", "wherever", "whether", "which", "whichever", "while", "who", "whoever", "whom", "whomever", "whose", "why", "will", "with", "within", "without", "worse", "worst", "would", "wouldn't", "yes", "yet", "you", "your", "yours", "yourself", "yourselves"];

	//Takes menteeBio (String) and mentorBios (Array of Objects with id and bio) and returns the Id of the best mentor.
	function matchMentor(menteeBio, mentorBios) {
		var menteeBioWords = menteeBio.split(" ");
		var output = [];
		trimWords(menteeBioWords);
		for(var i = 0; i < mentorBios.length; i++) {
			var mentorBioWords = mentorBios[i].bio.split(" ");
			mentorBioWords = trimWords(mentorBioWords);
			//Now, both menteeBioWords and bio are arrays of the words with the useless ones removed.
			var sim = [];
			sim.push(mentorBios[i].id);
			for(var j = 0; j < menteeBioWords.length; j++) {
				for(var k = 0; k < mentorBioWords.length; k++) {
					if(menteeBioWords[j] === mentorBioWords[k]) {
						sim.push(menteeBioWords[j]);
					}
				}
			}
			output.push(sim);
		}
		var maxVal = 0;
		var maxId = 'h';
		for(var i = 0; i < output.length; i++) {
			if(output[i].length > maxVal) {
				maxId = output[i][0];
				maxVal = output[i].length;
			}
		}
		return(maxId);
	}

	function trimWords(wordArray) {
		var output = wordArray;
		for(var i = output.length - 1; i >= 0; i--) {
			output[i] = output[i].toLowerCase();
			var last = output[i].slice(output[i].length - 1, output[i].length);
			if(last === ".") {
				output[i] = output[i].slice(0, output[i].length - 1);
			}
			if(checkUseless(output[i])) {
				output.splice(i, 1);
			}
		}
		return output;
	}

	function checkUseless(word) {
		for(var i = 0; i < uselessWords.length; i++) {
			uword = uselessWords[i];
			if(uword === word) {
				return true;
			} 
		}
		return false;
	}

