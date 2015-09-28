//
// (c) 2015 Paul Murphy & Kazim Narsinh
//

function radlibs_render(json, update_form) {

    var rval = '';
    var template;

    template =
        "TECHNIQUE:\n" +
        "Multiple {{ te.mo }}{{# te.mo }} {{/te.mo}}images of the pelvis were obtained{{#te.cn}} after the intravenous administration of {{#te.vc}}{{ te.vc }} mL of {{/te.vc}}{{ te.cn }} contrast{{ #te.rc }} at {{ te.rc }} mL/sec{{/te.rc}}{{/te.cn}}. {{ te.co }}\n" +
        "Image quality was {{te.qu}}{{^te.qu}}adequate{{/te.qu}}.\n" +
        "\n" +
        "FINDINGS:\n" +
        "Tumor location:\n";
        
    rval += Mustache.to_html(template,json);
    
    if (radlibs_has_path(json,'lo.SphincDist') ) {
        json.lo['SphincDist_helper'] = (parseInt(json.lo.SphincDist) > 0) ? 'The tumor involves the anal sphincter complex.' : 'Distance from the lowest extent of the tumor to top of anal sphincter (i.e. puborectalis): ' + json.lo.SphincDist + ' cm.'; 
    }
            
    template = 
        "Distance from the lowest extent of the tumor to anal verge: {{lo.VergDist}} cm.\n" +
        "{{SphincDist_helper}}\n" +
        "Relationship to peritoneal reflection: {{lo.PerRef}}.\n\n";
        
    rval += Mustache.to_html(template,json);    
            
    template = 
        "Tumor size and characteristics:\n" +
        "Craniocaudal extent: {{ch.CCsize}} cm.\n" +
        "{{CircExFrom_helper}}\n";
                
    if (radlibs_has_path(json,'ch.CircExFrom') && radlibs_has_path(json,'ch.CircExTo') ) {
        if (json.ch.CircExFrom == "circ" || json.ch.CircExTo=="circ") {
            json.CircExFrom["CircExFrom_helper"] = 'The tumor extends circumferentially.\n';
        } else {
            json.CircExFrom["CircExFrom_helper"] = "Circumferential extent: " + json.ch.CircExFrom + " o'clock to " + json.ch.CircExTo +  " o'clock.\n";
        }
	}

    rval += Mustache.to_html(template,json);        
    return rval;

} // radlibs_render
