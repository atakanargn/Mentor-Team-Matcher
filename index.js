var express = require('express');
var app = express();
var cors = require('cors');

app.use(cors());
app.set('view engine', 'pug')


Array.prototype.remove = function() {
    var what, a = arguments,
        L = a.length,
        ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
};

var teams = ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11", "T12", "T13", "T14", "T15"]

var mentors = ["Meri Taksi Deveciyan",
    "Uğur DURAK",
    "Tuğba DAĞDEVİREN",
    "Sena CEBE",
    "Duygu HIDIROĞLU",
    "Muhittin ÖZER",
    "Sabah Kemal CANSU",
    "Caner BAŞARAN",
    "Sinem ERSAN",
    "Mirkan Emir Sandžak",
    "Özgür DEVECİ",
    "Tümay Solak"
]

var saatler = ['09:00', '09:20', '09:40', '10:00', '10:20', '10:40', '11:00', '11:20', '11:40', '12:00', '12:20', '12:40']

app.get('/', async(req, res) => {
    var team_count = parseInt(req.query.team);
    var teams = []
    for (var i = 1; i < team_count + 1; i++) {
        teams.push("Takım " + i.toString());
    }

    var mentor_appointments = []
    for (var i = 0; i < saatler.length; i++) {
        for (var j = 0; j < mentors.length; j++) {
            if (mentors[j] == "Tümay Solak" && !(saatler[i] == '12:00' || saatler[i] == '12:20' || saatler[i] == '12:40')) {
                continue;
            }

            if (mentors[j] == "Tuğba DAĞDEVİREN" && !(saatler[i] == '11:00' || saatler[i] == '11:20' || saatler[i] == '11:40' || saatler[i] == '12:00' || saatler[i] == '12:20' || saatler[i] == '12:40')) {
                continue;
            }

            if (mentors[j] == "Meri Taksi Deveciyan" && !(saatler[i] == '10:40' || saatler[i] == '11:00' || saatler[i] == '11:20' || saatler[i] == '11:40' || saatler[i] == '12:00' || saatler[i] == '12:20' || saatler[i] == '12:40')) {
                continue;
            }

            if (mentors[j] == "Mirkan Emir Sandžak" && !(saatler[i] == '12:00' || saatler[i] == '12:20' || saatler[i] == '12:40')) {
                continue;
            }

            if (mentors[j] == "Sinem ERSAN" && !(saatler[i] == '10:00' || saatler[i] == '10:20' || saatler[i] == '10:40')) {
                continue;
            }

            mentor_appointments.push([mentors[j], saatler[i]])
        }
    }



    mentor_appointments.push()

    var result = [];
    var limit = (teams.length * Math.ceil(mentor_appointments.length / teams.length)) - mentor_appointments.length

    var starttime = new Date().getTime() / 1000;
    while (mentor_appointments.length > limit) {
        for (var i = 0; i < teams.length; i++) {
            try {
                var choosen = shuffle(mentor_appointments)[0];
                var includes = false;
                for (var j = 0; j < result.length; j++) {
                    if (result[j][0] == teams[i]) {
                        includes = true;
                        break;
                    }
                }

                if (includes == false) {
                    result.push([teams[i], choosen]);
                    mentor_appointments.remove(choosen);
                } else {
                    var exist = false;
                    for (var j = 0; j < result.length; j++) {
                        if (result[j][0] == teams[i]) {
                            if (result[j][1][0] == choosen[0] || result[j][1][1] == choosen[1]) {
                                exist = true;
                                break;
                            }
                        }
                    }

                    if (exist == false) {
                        result.push([teams[i], choosen]);
                        mentor_appointments.remove(choosen);
                    }
                }
            } catch {
                continue
            }

        }
        var lasttime = new Date().getTime() / 1000;
        console.log(lasttime);
        if (starttime + 3 < lasttime) {
            break;
        }
    }

    var diziliResult = []
    var c1 = 1;
    var c2 = 0;
    while (c1 < team_count + 1 && result.length > 0) {
        for (var i = 0; i < result.length; i++) {
            if (result[i][0] == "Takım " + c1.toString()) {
                diziliResult.push(result[i]);
                result.remove(result[i]);
            }
        }
        diziliResult.push([
            [''],
            [
                [''],
                ['']
            ]
        ])
        c1++;
    };
    return res.render('table', { tasks: diziliResult });
});

app.listen();