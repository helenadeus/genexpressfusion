$(document).bind('mobileinit',function(){
		$.mobile.selectmenu.prototype.options.nativeMenu = false;
	});

var s = 3;
var moreSPARQL = function () {
	var more = '<label for="sparql3">SPARQL endpoint</label>'
				+'<input type="text" id="sparql3" name="sparql2" value="http://bloodprogram.hsci.harvard.edu/sparql"  /><br />';
		
}
var getClasses = function () {
	
	var query = "select distinct ?class where { [] a ?class } limit 10 offset 0";
	var endpoints = $('.sparql');
	for (var i=0; i<endpoints.length; i++) {
		//create select boxes		
		var id = $(endpoints[i]).attr('id');
		
		
		$('#sparql_types').show();
		//what's the url
		var url = $(endpoints[i]).val();
		var totalurl = 'srx2json.php?url='+escape(url)+'&query='+escape(query)+'&par1='+id;
		
		//now the query
		$.ajax({
			url: totalurl,
			success: function (data) {
				//parse json
				var decoded = JSON.parse(data);var xmlres = decoded[0];var domid = decoded[1];
				var classes = [];var prettyclasses = [];
				for (var i in xmlres.results.bindings) {
					classes.push(xmlres.results.bindings[i].class.value);
					var tmp = xmlres.results.bindings[i].class.value.match(/\/([^/]+)$/);
					
					if(tmp){
						var tmp1 = tmp[1].match(/#(.*)$/);
						if(tmp1!==null && tmp1[1]!=''){
							prettyclasses.push(tmp1[1]);	
						}
						else {
							prettyclasses.push(tmp[1]);		
						}
					}
					
					
					

				}

				selectCreateOptions(domid+'_types', classes, prettyclasses);
			}
		})
		
	}
	$('#link').show()
}

var selectCreateOptions = function(domid, optsVals, optsLabels){
	$('#'+domid).show();
	for (var i=0; i<optsVals.length; i++) {
		$('#'+domid).append('<option value="'+optsVals[i]+'">'+optsLabels[i]+'</option>')
	}
	
	$('#'+domid+'_type').selectmenu("refresh", true);
}

var matchClasses = function () {
	//find the values selects
	if(!$('#nameVar').val().match(/^[A-Za-z0-9_]+$/)) { 
		$('#varError').html('Plase make sure variable name only contains letter, numbers or underscore.');
	}
	else {
		var varname = $('#nameVar').val();
		var template = 'CONSTRUCT { '+varname+' a <'+$('#sparql1_types option:selected').val()+'> }'; 
		if($('#sparql2_types option:selected').val()!=='(no match)'){
			var construct2 =  'WHERE { '+varname+' a <'+$('#sparql2_types option:selected').val()+'> }';
			//$('#constructLabel2').html('Construct for '+$('#sparql2').val());
			$('#construct2').html(template+'\n'+construct2);
		}
		if($('#sparql3_types option:selected').val()!=='(no match)'){
			var construct3 =  'WHERE { '+varname+' a <'+$('#sparql3_types option:selected').val()+'> }';
			//$('#constructLabel3').html('Construct for '+$('#sparql3').val());
			$('#construct3').html(template+'\n'+construct3);
		}
		
		
	}
}
