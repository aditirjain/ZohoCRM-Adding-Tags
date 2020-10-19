getContact = zoho.crm.getRecordById("Contacts",id);
contactId = getContact.get("id");
contactEmail = getContact.get("Email");
contactSEmail = getContact.get("Secondary_Email");
contactMobile = getContact.get("Mobile");
contactPhone = getContact.get("Phone");
//info getLead;
//to chek contacts are duplicate or not
email = 0;
mobile = 0;
phone = 0;
ids = List();
LeadTag = "";
if(LeadEmail != null)
{
	searchString = "(Email:equals:".concat(LeadEmail).concat(")");
	result = zoho.crm.searchRecords("Contacts",searchString);
	for each  rec in result
	{
		userId = rec.get("id");
		email = email + 1;
		ids.add(userId);
	}
	searchString = "(Secondary_Email:equals:".concat(LeadEmail).concat(")");
	response = zoho.crm.searchRecords("Contacts",searchString);
	for each  rec in response
	{
		if(rec.get("Secondary_Email") != rec.get("Email"))
		{
			userId = rec.get("id");
			email = email + 1;
			ids.add(userId);
			//info "inside";
			//info n;
		}
	}
}
if(LeadSEmail != null)
{
	searchString = "(Email:equals:".concat(LeadSEmail).concat(")");
	response = zoho.crm.searchRecords("Contacts",searchString);
	for each  rec in response
	{
		userId = rec.get("id");
		email = email + 1;
		ids.add(userId);
	}
	searchString = "(Secondary_Email:equals:".concat(LeadSEmail).concat(")");
	response = zoho.crm.searchRecords("Contacts",searchString);
	for each  rec in response
	{
		if(rec.get("Secondary_Email") != rec.get("Email"))
		{
			userId = rec.get("id");
			email = email + 1;
			ids.add(userId);
			//info "inside";
			//info n;
		}
	}
}
info "email";
info email;
info ids;
if(LeadMobile != null)
{
	LeadMobile = LeadMobile.subString(LeadMobile.length() - 10,LeadMobile.length());
	searchString = "(Mobile:starts_with:*".concat(LeadMobile).concat(")");
	response = zoho.crm.searchRecords("Contacts",searchString);
	for each  rec in response
	{
		userId = rec.get("id");
		mobile = mobile + 1;
		ids.add(userId);
	}
}
info "mobile";
info mobile;
info ids;
if(LeadPhone != null)
{
	LeadPhone = LeadPhone.subString(LeadPhone.length() - 10,LeadPhone.length());
	searchString = "(Phone:starts_with:*".concat(LeadPhone).concat(")");
	response = zoho.crm.searchRecords("Contacts",searchString);
	//info response;
	for each  rec in response
	{
		userId = rec.get("id");
		phone = phone + 1;
		//ids.add(userId);
	}
	searchString = "(Mobile:starts_with:*".concat(LeadPhone).concat(")");
	response = zoho.crm.searchRecords("Contacts",searchString);
	//info "response 2";
	//info response;
	for each  rec in response
	{
		userId = rec.get("id");
		phone = phone + 1;
		//ids.add(userId);
	}
}
if(email > 1)
{
	LeadTag = LeadTag.concat("Duplicate Email Contacts");
}
if(mobile > 1)
{
	if(LeadTag == "")
	{
		LeadTag = LeadTag.concat("Duplicate Mobile in Contacts");
	}
	else
	{
		LeadTag = LeadTag.concat(",Duplicate Mobile Contacts");
	}
}
if(phone > 1)
{
	if(LeadTag == "")
	{
		LeadTag = LeadTag.concat("Duplicate Phone Contacts");
	}
	else
	{
		LeadTag = LeadTag.concat(",Duplicate Phone Contacts");
	}
}
info "LeadTag";
/*info getLead.get("Tag");*/
info LeadId;
info LeadTag;
mp = Map();
mp.put("tag_names",LeadTag);
response = invokeurl
[
	url :"https://www.zohoapis.com/crm/v2/Leads/" + LeadId + "/actions/add_tags?"
	type :POST
	parameters:mp
	connection:"leadstagupdate"
];
info response;
