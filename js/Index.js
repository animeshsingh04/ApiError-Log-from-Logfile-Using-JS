  
      
      var logObj = [];
      var apiPoint = [];

      function filterSearch (selectedValue, event){
        var typingTimer;                
        var doneTypingInterval = 10000;
        var  inputVal = $('#myInput').val();
        clearTimeout(typingTimer);
        if(event.keyCode===13)
        {
          var dropdownValue = $('#dropdownSelect option:selected').text();
          typingTimer = setTimeout(filterData(dropdownValue,inputVal), doneTypingInterval);
          debugger;
        }

      };
      function filterData(dropdownValue,inputVal)
      {
        if(inputVal)
        {
          var filterObj = [];
          filterLogObj = logObj.filter(item=>item[dropdownValue].toLowerCase().includes((inputVal).toLowerCase()));
          displayLog(filterLogObj);
        }
        else{
          return;
        }
        
      }  

      function openFile(event) 
      {
          var distinctApi = [];
          
          var input = event.target;
          var reader = new FileReader();
          reader.onload = function(){
          var text = reader.result;
          var currentStr = text.split("\n");
          logObj = convertJsonToJSObjects(currentStr,logObj);
          distinctApi = getDistinctApi();
          getLogSortedByDate(logObj);
          displayLog(logObj);
        };
         reader.readAsText(input.files[0]);   
      };

      function convertJsonToJSObjects(currentStr,logJsonObj)
      {
        var apiLastindex;
        for(var i=0;i<currentStr.length-1;i++)
        {
          var start = 3;
          var  flag = 1;
          var currentObj = JSON.parse(currentStr[i]);
          logJsonObj.push(currentObj);
          while(flag)
          {           
            if(currentObj.Message[start]!=":")
            {
              start++;
            }
            else
            {
              apiLastindex = start;
              flag = 0;
            }
          }           
          currentObj.Api = currentObj.Message.substring(3,apiLastindex);
          apiPoint.push(currentObj.Api) 
        }
        return logJsonObj;
      };

      function getDistinctApi()
      {
        distinctApi = apiPoint.filter((x, i, a) => a.indexOf(x) == i)
      }

      function getLogSortedByDate(logObj)
      {
        logObj.sort(function (a,b){  
        var dateA = new Date(a.date).getTime();
        var dateB = new Date(b.date).getTime();
        return dateA > dateB ? 1 : -1;});
      }

      function displayLog(logObj)
      {
        $(".data.col-md-12").empty();
        for(var i=0;i<distinctApi.length-1;i++)
        {
          $(".data.col-md-12").append(
              "<div class = 'apiLog collapsible'>"
                +"<h5 class = 'apiName'>"
                  + "<a  class='Apibtn' data-toggle='collapse' href='#collapseExample"+i+"' role='button' aria-expanded='false' aria-controls='collapseExample'>" 
                    + distinctApi[i]
                  +"</a>"
                +"</h5>"
                +"<div class='collapse row' id='collapseExample"+i+"'>"
                  +"<div class='labels'>"
                    +"<div class='date label col-md-3'>"
                        + "Date"
                    +"</div>"
                    +"<div class='level label col-md-3'>"
                        + "Level"
                    +"</div>"
                    +"<div class='logger label col-md-3'>"
                        + "Logger"
                    +"</div>"
                    +"<div class='message label col-md-3'>"
                      + "Message"
                    +"</div>"
                  +"</div>"
                  +"<div class='line'>"
                  +"</div>"
                  +"<div id='logData' class='apiLogData"+i+"'>"
                  +"</div>"
                +"</div>"
              +"</div>"
              )
          for(var j=0; j<logObj.length-1;j++)
          {
           
            if(distinctApi[i]==logObj[j].Api)
            {
              
              $(".apiLogData"+i+"").append(

                "<div class = 'date col-md-3'>"
                  +"<p id ='date_value'>"
                    +logObj[j].Date
                  +"</p>"
                +"</div>"
                +
                "<div class = 'level col-md-3'>"
                  +"<p class = '"+i+"level"+j+"' id ='level_value'>"
                    +logObj[j].Level
                  +"</p>"
                +"</div>"
                +
                "<div class = 'logger col-md-3'>"
                  +"<p id ='logger_value'>"
                    +logObj[j].Logger
                  +"</p>"
                +"</div>"
                +
                "<div class = 'message col-md-3'>"
                  +"<p id ='message_value'>"
                    +logObj[j].Message
                  +"</p>"
                +"</div>"

                +"<hr class='sperator'>" + "</hr>"
              )
              $("."+i+"level"+j+"").attr('data-value',logObj[j].Level) ;
            
            }
          }
        }
      }
