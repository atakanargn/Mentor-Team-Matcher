"use strict";

var express = require('express');

var app = express();

var cors = require('cors');

app.use(cors());
app.set('view engine', 'pug');

Array.prototype.remove = function () {
  var what,
      a = arguments,
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
      temporaryValue,
      randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

;
var teams = ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11", "T12", "T13", "T14", "T15"];
var mentors = ["Meri Taksi Deveciyan", "Uğur DURAK", "Tuğba DAĞDEVİREN", "Sena CEBE", "Tümay Solak", "Duygu HIDIROĞLU", "Muhittin ÖZER", "Sabah Kemal CANSU", "Caner BAŞARAN", "Sinem ERSAN", "Mirkan Emir Sandžak", "Özgür DEVECİ"];
var saatler = ['09:00', '09:20', '09:40', '10:00', '10:20', '10:40', '11:00', '11:20', '11:40', '12:00', '12:20', '12:40'];
app.get('/', function _callee(req, res) {
  var team_count, teams, i, mentor_appointments, j, result, limit, starttime, choosen, includes, exist, lasttime, diziliResult, c1, c2;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          team_count = parseInt(req.query.team);
          teams = [];

          for (i = 1; i < team_count + 1; i++) {
            teams.push("Takım " + i.toString());
          }

          mentor_appointments = [];

          for (i = 0; i < saatler.length; i++) {
            for (j = 0; j < mentors.length; j++) {
              mentor_appointments.push([mentors[j], saatler[i]]);
            }
          }

          result = [];
          limit = teams.length * Math.ceil(mentor_appointments.length / teams.length) - mentor_appointments.length;
          starttime = new Date().getTime() / 1000;

        case 8:
          if (!(mentor_appointments.length > limit)) {
            _context.next = 52;
            break;
          }

          i = 0;

        case 10:
          if (!(i < teams.length)) {
            _context.next = 46;
            break;
          }

          _context.prev = 11;
          choosen = shuffle(mentor_appointments)[0];
          includes = false;
          j = 0;

        case 15:
          if (!(j < result.length)) {
            _context.next = 22;
            break;
          }

          if (!(result[j][0] == teams[i])) {
            _context.next = 19;
            break;
          }

          includes = true;
          return _context.abrupt("break", 22);

        case 19:
          j++;
          _context.next = 15;
          break;

        case 22:
          if (!(includes == false)) {
            _context.next = 27;
            break;
          }

          result.push([teams[i], choosen]);
          mentor_appointments.remove(choosen);
          _context.next = 38;
          break;

        case 27:
          exist = false;
          j = 0;

        case 29:
          if (!(j < result.length)) {
            _context.next = 37;
            break;
          }

          if (!(result[j][0] == teams[i])) {
            _context.next = 34;
            break;
          }

          if (!(result[j][1][0] == choosen[0] || result[j][1][1] == choosen[1])) {
            _context.next = 34;
            break;
          }

          exist = true;
          return _context.abrupt("break", 37);

        case 34:
          j++;
          _context.next = 29;
          break;

        case 37:
          if (exist == false) {
            result.push([teams[i], choosen]);
            mentor_appointments.remove(choosen);
          }

        case 38:
          _context.next = 43;
          break;

        case 40:
          _context.prev = 40;
          _context.t0 = _context["catch"](11);
          return _context.abrupt("continue", 43);

        case 43:
          i++;
          _context.next = 10;
          break;

        case 46:
          lasttime = new Date().getTime() / 1000;
          console.log(lasttime);

          if (!(starttime + 3 < lasttime)) {
            _context.next = 50;
            break;
          }

          return _context.abrupt("break", 52);

        case 50:
          _context.next = 8;
          break;

        case 52:
          diziliResult = [];
          c1 = 1;
          c2 = 0;

          while (c1 < team_count + 1 && result.length > 0) {
            for (i = 0; i < result.length; i++) {
              if (result[i][0] == "Takım " + c1.toString()) {
                diziliResult.push(result[i]);
                result.remove(result[i]);
              }
            }

            diziliResult.push([[''], [[''], ['']]]);
            c1++;
          }

          ;
          return _context.abrupt("return", res.render('table', {
            tasks: diziliResult
          }));

        case 58:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[11, 40]]);
});
app.listen(3000, function () {
  console.log("API ÇALIŞIYOR.");
  console.log("http://localhost:3000");
});