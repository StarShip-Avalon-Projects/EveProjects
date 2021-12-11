/**
 * GESI.Wrappers V.02
 * 
 * An interface to the GSEI Library when the Library is not available in the google store.
 * 
 * Instructions:
 * 
 * Install:
 * 1 Copy this file to the app scripts editor
 * 2 Somewhere in OnOpen() add a call to onGESIOpen() trigger. This will install the GESI UI Menu options
 * 
 * Removal:
 * Delete this file and remove the onGESIOpen() call from onOpen() trigger;
 * 
 * Author BlackSmoke https://github.com/Blacksmoke16/GESI/
 * Modified by CJ Kilman https://github.com/StarShip-Avalon-Projects/EveProjects/tree/main
 */


// region Startup

/**
 * onOpen() procedure for adding GESI Menu to Sheet
 * Call this function from any onOpen() 
 *
 */
function onGESIOpen()
 { 
  var ui = SpreadsheetApp.getUi();
    ui.createMenu("GESI")
    .addItem('Authorize Character', 'showSSOModal')
    .addItem('Deauthorize Character', 'deauthorizeCharacter')
    .addItem('Set Main Character', 'setMainCharacter')
    .addItem('Enable Sheet Auth Storage', 'setAuthStorage')
    .addItem('Reset', 'reset')
    .addToUi();
}

function showSSOModal()
{
  return GESI.showSSOModal();
}
function deauthorizeCharacter()
{
  return GESI.deauthorizeCharacter();
}
function getMainCharacter()
{
  return GESI.getMainCharacter();
}
function setMainCharacter()
{
  return GESI.setMainCharacter();
}
function setAuthStorage()
{
  return GESI.setAuthStorage();
}
function reset()
{
  return GESI.reset();
}

// endregion

/**
 * List all active player alliances
 e, sho
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function alliances(show_column_headings = true, version = "v1")
 {
  return GESI.invoke('alliances', { show_column_headings, version })
}

/**
 * Public information about an alliance
 *
 * @param {number} alliance_id - An EVE alliance ID
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function alliances_alliance(alliance_id, show_column_headings = true, version = "v2")
 {
  if (!alliance_id) throw new Error(`alliance_id is required`);
  return GESI.invoke('alliances_alliance', { alliance_id, show_column_headings, version })
}

/**
 * Return contacts of an alliance
 *
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function alliances_alliance_contacts(name, show_column_headings = true, version = "v1")
 {
  return GESI.invoke('alliances_alliance_contacts', { name, show_column_headings, version })
}

/**
 * Return custom labels for an alliance's contacts
 *
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function alliances_alliance_contacts_labels(name, show_column_headings = true, version = "v1")
 {
  return GESI.invoke('alliances_alliance_contacts_labels', { name, show_column_headings, version })
}

/**
 * List all current member corporations of an alliance
 *
 * @param {number} alliance_id - An EVE alliance ID
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function alliances_alliance_corporations(alliance_id, show_column_headings = true, version = "v1")
 {
  if (!alliance_id) throw new Error(`alliance_id is required`);
  return GESI.invoke('alliances_alliance_corporations', { alliance_id, show_column_headings, version })
}

/**
 * Get the icon urls for a alliance
 *
 * @param {number} alliance_id - An EVE alliance ID
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function alliances_alliance_icons(alliance_id, show_column_headings = true, version = "v1")
 {
  if (!alliance_id) throw new Error(`alliance_id is required`);
  return GESI.invoke('alliances_alliance_icons', { alliance_id, show_column_headings, version })
}

/**
 * Bulk lookup of character IDs to corporation, alliance and faction
 *
 * @param {number[]} characters - The character IDs to fetch affiliations for. All characters must exist, or none will be returned
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function characters_affiliation(characters, show_column_headings = true, version = "v1")
 {
  if (!characters) throw new Error(`characters is required`);
  return GESI.invoke('characters_affiliation', { characters, show_column_headings, version })
}

/**
 * Public information about a character
 *
 * @param {number} character_id - An EVE character ID
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function characters_character(character_id, show_column_headings = true, version = "v4")
 {
  if (!character_id) throw new Error(`character_id is required`);
  return GESI.invoke('characters_character', { character_id, show_column_headings, version })
}

/**
 * Return a list of agents research information for a character. The formula for finding the current research points with an agent is: currentPoints = remainderPoints + pointsPerDay * days(currentTime - researchStartDate)
 *
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function characters_character_agents_research(name, show_column_headings = true, version = "v1")
 {
  return GESI.invoke('characters_character_agents_research', { name, show_column_headings, version })
}

/**
 * Return a list of the characters assets
 *
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function characters_character_assets(name, show_column_headings = true, version = "v4")
 {
  return GESI.invoke('characters_character_assets', { name, show_column_headings, version })
}

/**
 * Return locations for a set of item ids, which you can get from character assets endpoint. Coordinates for items in hangars or stations are set to (-1,0,0)
 *
 * @param {number[]} item_ids - A list of item ids
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function characters_character_assets_locations(item_ids,name, show_column_headings = true, version = "v1")
 {
  if (!item_ids) throw new Error(`item_ids is required`);
  return GESI.invoke('characters_character_assets_locations', { item_ids, name, show_column_headings, version })
}

/**
 * Return names for a set of item ids, which you can get from character assets endpoint. Typically used for items that can customize names, like containers or ships.
 *
 * @param {number[]} item_ids - A list of item ids
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function characters_character_assets_names(item_ids,name, show_column_headings = true, version = "v1")
 {
  if (!item_ids) throw new Error(`item_ids is required`);
  return GESI.invoke('characters_character_assets_names', { item_ids, name, show_column_headings, version })
}

/**
 * Return attributes of a character
 *
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function characters_character_attributes(name, show_column_headings = true, version = "v1")
 {
  return GESI.invoke('characters_character_attributes', { name, show_column_headings, version })
}

/**
 * Return a list of blueprints the character owns
 *
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function characters_character_blueprints(name, show_column_headings = true, version = "v2")
 {
  return GESI.invoke('characters_character_blueprints', { name, show_column_headings, version })
}

/**
 * A list of your character's personal bookmarks
 *
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function characters_character_bookmarks(name, show_column_headings = true, version = "v1")
 {
  return GESI.invoke('characters_character_bookmarks', { name, show_column_headings, version })
}

/**
 * A list of your character's personal bookmark folders
 *
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function characters_character_bookmarks_folders(name, show_column_headings = true, version = "v1")
 {
  return GESI.invoke('characters_character_bookmarks_folders', { name, show_column_headings, version })
}

/**
 * Get 49 event summaries from the calendar. If no from_event ID is given, the resource will return the next 50 chronological event summaries from now. If a from_event ID is specified, it will return the next 50 chronological event summaries from after that event
 *
 * @param {number} from_event - The event ID to retrieve events from
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function characters_character_calendar(from_event,name, show_column_headings = true, version = "v1")
 {
  return GESI.invoke('characters_character_calendar', { from_event, name, show_column_headings, version })
}

/**
 * Get all the information for a specific event
 *
 * @param {number} event_id - The id of the event requested
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function characters_character_calendar_event(event_id,name, show_column_headings = true, version = "v2")
 {
  if (!event_id) throw new Error(`event_id is required`);
  return GESI.invoke('characters_character_calendar_event', { event_id, name, show_column_headings, version })
}

/**
 * Get all invited attendees for a given event
 *
 * @param {number} event_id - The id of the event requested
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function characters_character_calendar_event_attendees(event_id,name, show_column_headings = true, version = "v1")
 {
  if (!event_id) throw new Error(`event_id is required`);
  return GESI.invoke('characters_character_calendar_event_attendees', { event_id, name, show_column_headings, version })
}

/**
 * A list of the character's clones
 *
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function characters_character_clones(name, show_column_headings = true, version = "v2")
 {
  return GESI.invoke('characters_character_clones', { name, show_column_headings, version })
}

/**
 * Return contacts of a character
 *
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function characters_character_contacts(name, show_column_headings = true, version = "v1")
 {
  return GESI.invoke('characters_character_contacts', { name, show_column_headings, version })
}

/**
 * Return custom labels for a character's contacts
 *
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function characters_character_contacts_labels(name, show_column_headings = true, version = "v1")
 {
  return GESI.invoke('characters_character_contacts_labels', { name, show_column_headings, version })
}

/**
 * Returns contracts available to a character, only if the character is issuer, acceptor or assignee. Only returns contracts no older than 29 days, or if the status is "in_progress".
 *
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function characters_character_contracts(name, show_column_headings = true, version = "v1")
 {
  return GESI.invoke('characters_character_contracts', { name, show_column_headings, version })
}

/**
 * Lists bids on a particular auction contract
 *
 * @param {number} contract_id - ID of a contract
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function characters_character_contracts_contract_bids(contract_id,name, show_column_headings = true, version = "v1")
 {
  if (!contract_id) throw new Error(`contract_id is required`);
  return GESI.invoke('characters_character_contracts_contract_bids', { contract_id, name, show_column_headings, version })
}

/**
 * Lists items of a particular contract
 *
 * @param {number} contract_id - ID of a contract
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function characters_character_contracts_contract_items(contract_id,name, show_column_headings = true, version = "v1")
 {
  if (!contract_id) throw new Error(`contract_id is required`);
  return GESI.invoke('characters_character_contracts_contract_items', { contract_id, name, show_column_headings, version })
}

/**
 * Get a list of all the corporations a character has been a member of
 *
 * @param {number} character_id - An EVE character ID
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function characters_character_corporationhistory(character_id, show_column_headings = true, version = "v1")
 {
  if (!character_id) throw new Error(`character_id is required`);
  return GESI.invoke('characters_character_corporationhistory', { character_id, show_column_headings, version })
}

/**
 * Return a character's jump activation and fatigue information
 *
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function characters_character_fatigue(name, show_column_headings = true, version = "v1")
 {
  return GESI.invoke('characters_character_fatigue', { name, show_column_headings, version })
}

/**
 * Return fittings of a character
 *
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function characters_character_fittings(name, show_column_headings = true, version = "v1")
 {
  return GESI.invoke('characters_character_fittings', { name, show_column_headings, version })
}

/**
 * Return the fleet ID the character is in, if any.
 *
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function characters_character_fleet(name, show_column_headings = true, version = "v1")
 {
  return GESI.invoke('characters_character_fleet', { name, show_column_headings, version })
}

/**
 * Statistical overview of a character involved in faction warfare
 *
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function characters_character_fw_stats(name, show_column_headings = true, version = "v1")
 {
  return GESI.invoke('characters_character_fw_stats', { name, show_column_headings, version })
}

/**
 * Return implants on the active clone of a character
 *
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function characters_character_implants(name, show_column_headings = true, version = "v1")
 {
  return GESI.invoke('characters_character_implants', { name, show_column_headings, version })
}

/**
 * List industry jobs placed by a character
 *
 * @param {boolean} include_completed - Whether to retrieve completed character industry jobs. Only includes jobs from the past 89 days
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function characters_character_industry_jobs(include_completed,name, show_column_headings = true, version = "v1")
 {
  return GESI.invoke('characters_character_industry_jobs', { include_completed, name, show_column_headings, version })
}

/**
 * Return a list of a character's kills and losses going back 89 days
 *
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function characters_character_killmails_recent(name, show_column_headings = true, version = "v1")
 {
  return GESI.invoke('characters_character_killmails_recent', { name, show_column_headings, version })
}

/**
 * Information about the characters current location. Returns the current solar system id, and also the current station or structure ID if applicable
 *
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function characters_character_location(name, show_column_headings = true, version = "v1")
 {
  return GESI.invoke('characters_character_location', { name, show_column_headings, version })
}

/**
 * Return a list of loyalty points for all corporations the character has worked for
 *
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function characters_character_loyalty_points(name, show_column_headings = true, version = "v1")
 {
  return GESI.invoke('characters_character_loyalty_points', { name, show_column_headings, version })
}

/**
 * Return the 49 most recent mail headers belonging to the character that match the query criteria. Queries can be filtered by label, and last_mail_id can be used to paginate backwards
 *
 * @param {number[]} labels - Fetch only mails that match one or more of the given labels
 * @param {number} last_mail_id - List only mail with an ID lower than the given ID, if present
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function characters_character_mail(labels, last_mail_id,name, show_column_headings = true, version = "v1")
 {
  return GESI.invoke('characters_character_mail', { labels, last_mail_id, name, show_column_headings, version })
}

/**
 * Return a list of the users mail labels, unread counts for each label and a total unread count.
 *
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function characters_character_mail_labels(name, show_column_headings = true, version = "v2")
 {
  return GESI.invoke('characters_character_mail_labels', { name, show_column_headings, version })
}

/**
 * Return all mailing lists that the character is subscribed to
 *
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function characters_character_mail_lists(name, show_column_headings = true, version = "v1")
 {
  return GESI.invoke('characters_character_mail_lists', { name, show_column_headings, version })
}

/**
 * Return the contents of an EVE mail
 *
 * @param {number} mail_id - An EVE mail ID
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function characters_character_mail_mail(mail_id,name, show_column_headings = true, version = "v1")
 {
  if (!mail_id) throw new Error(`mail_id is required`);
  return GESI.invoke('characters_character_mail_mail', { mail_id, name, show_column_headings, version })
}

/**
 * Return a list of medals the character has
 *
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function characters_character_medals(name, show_column_headings = true, version = "v1")
 {
  return GESI.invoke('characters_character_medals', { name, show_column_headings, version })
}

/**
 * Paginated record of all mining done by a character for the past 29 days
 *
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function characters_character_mining(name, show_column_headings = true, version = "v1")
 {
  return GESI.invoke('characters_character_mining', { name, show_column_headings, version })
}

/**
 * Return character notifications
 *
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function characters_character_notifications(name, show_column_headings = true, version = "v4")
 {
  return GESI.invoke('characters_character_notifications', { name, show_column_headings, version })
}

/**
 * Return notifications about having been added to someone's contact list
 *
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function characters_character_notifications_contacts(name, show_column_headings = true, version = "v1")
 {
  return GESI.invoke('characters_character_notifications_contacts', { name, show_column_headings, version })
}

/**
 * Checks if the character is currently online
 *
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function characters_character_online(name, show_column_headings = true, version = "v1")
 {
  return GESI.invoke('characters_character_online', { name, show_column_headings, version })
}

/**
 * Return a list of tasks finished by a character
 *
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function characters_character_opportunities(name, show_column_headings = true, version = "v1")
 {
  return GESI.invoke('characters_character_opportunities', { name, show_column_headings, version })
}

/**
 * List open market orders placed by a character
 *
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function characters_character_orders(name, show_column_headings = true, version = "v1")
 {
  return GESI.invoke('characters_character_orders', { name, show_column_headings, version })
}

/**
 * List cancelled and expired market orders placed by a character up to 89 days in the past.
 *
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function characters_character_orders_history(name, show_column_headings = true, version = "v1")
 {
  return GESI.invoke('characters_character_orders_history', { name, show_column_headings, version })
}

/**
 * Returns a list of all planetary colonies owned by a character.
 *
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function characters_character_planets(name, show_column_headings = true, version = "v1")
 {
  return GESI.invoke('characters_character_planets', { name, show_column_headings, version })
}

/**
 * Returns full details on the layout of a single planetary colony, including links, pins and routes. Note: Planetary information is only recalculated when the colony is viewed through the client. Information will not update until this criteria is met.
 *
 * @param {number} planet_id - Planet id of the target planet
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function characters_character_planets_planet(planet_id,name, show_column_headings = true, version = "v2")
 {
  if (!planet_id) throw new Error(`planet_id is required`);
  return GESI.invoke('characters_character_planets_planet', { planet_id, name, show_column_headings, version })
}

/**
 * Get portrait urls for a character
 *
 * @param {number} character_id - An EVE character ID
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function characters_character_portrait(character_id, show_column_headings = true, version = "v1")
 {
  if (!character_id) throw new Error(`character_id is required`);
  return GESI.invoke('characters_character_portrait', { character_id, show_column_headings, version })
}

/**
 * Returns a character's corporation roles
 *
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function characters_character_roles(name, show_column_headings = true, version = "v2")
 {
  return GESI.invoke('characters_character_roles', { name, show_column_headings, version })
}

/**
 * Search for entities that match a given sub-string.
 *
 * @param {string} search - The string to search on
 * @param {string[]} categories - Type of entities to search for
 * @param {string} language - Language to use in the response, takes precedence over Accept-Language
 * @param {boolean} strict - Whether the search should be a strict match
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function characters_character_search(search, categories, languagename, strict,name, show_column_headings = true, version = "v2")
 {
  if (!search) throw new Error(`search is required`);
 if (!categories) throw new Error(`categories is required`);
  return GESI.invoke('characters_character_search', { search, categories, language, strict, name, show_column_headings, version })
}

/**
 * Get the current ship type, name and id
 *
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function characters_character_ship(name, show_column_headings = true, version = "v1")
 {
  return GESI.invoke('characters_character_ship', { name, show_column_headings, version })
}

/**
 * List the configured skill queue for the given character
 *
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function characters_character_skillqueue(name, show_column_headings = true, version = "v1")
 {
  return GESI.invoke('characters_character_skillqueue', { name, show_column_headings, version })
}

/**
 * List all trained skills for the given character
 *
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function characters_character_skills(name, show_column_headings = true, version = "v3")
 {
  return GESI.invoke('characters_character_skills', { name, show_column_headings, version })
}

/**
 * Return character standings from agents, NPC corporations, and factions
 *
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function characters_character_standings(name, show_column_headings = true, version = "v1")
 {
  return GESI.invoke('characters_character_standings', { name, show_column_headings, version })
}

/**
 * Returns a character's titles
 *
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function characters_character_titles(name, show_column_headings = true, version = "v1")
 {
  return GESI.invoke('characters_character_titles', { name, show_column_headings, version })
}

/**
 * Returns a character's wallet balance
 *
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function characters_character_wallet(name, show_column_headings = true, version = "v1")
 {
  return GESI.invoke('characters_character_wallet', { name, show_column_headings, version })
}

/**
 * Retrieve the given character's wallet journal going 29 days back
 *
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function characters_character_wallet_journal(name, show_column_headings = true, version = "v5")
 {
  return GESI.invoke('characters_character_wallet_journal', { name, show_column_headings, version })
}

/**
 * Get wallet transactions of a character
 *
 * @param {number} from_id - Only show transactions happened before the one referenced by this id
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function characters_character_wallet_transactions(from_id,name, show_column_headings = true, version = "v1")
 {
  return GESI.invoke('characters_character_wallet_transactions', { from_id, name, show_column_headings, version })
}

/**
 * Lists bids on a public auction contract
 *
 * @param {number} contract_id - ID of a contract
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function contracts_public_bids_contract(contract_id, show_column_headings = true, version = "v1")
 {
  if (!contract_id) throw new Error(`contract_id is required`);
  return GESI.invoke('contracts_public_bids_contract', { contract_id, show_column_headings, version })
}

/**
 * Lists items of a public contract
 *
 * @param {number} contract_id - ID of a contract
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function contracts_public_items_contract(contract_id, show_column_headings = true, version = "v1")
 {
  if (!contract_id) throw new Error(`contract_id is required`);
  return GESI.invoke('contracts_public_items_contract', { contract_id, show_column_headings, version })
}

/**
 * Returns a paginated list of all public contracts in the given region
 *
 * @param {number} region_id - An EVE region id
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function contracts_public_region(region_id, show_column_headings = true, version = "v1")
 {
  if (!region_id) throw new Error(`region_id is required`);
  return GESI.invoke('contracts_public_region', { region_id, show_column_headings, version })
}

/**
 * Extraction timers for all moon chunks being extracted by refineries belonging to a corporation.
 *
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function corporation_corporation_mining_extractions(name, show_column_headings = true, version = "v1")
 {
  return GESI.invoke('corporation_corporation_mining_extractions', { name, show_column_headings, version })
}

/**
 * Paginated list of all entities capable of observing and recording mining for a corporation
 *
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function corporation_corporation_mining_observers(name, show_column_headings = true, version = "v1")
 {
  return GESI.invoke('corporation_corporation_mining_observers', { name, show_column_headings, version })
}

/**
 * Paginated record of all mining seen by an observer
 *
 * @param {number} observer_id - A mining observer id
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function corporation_corporation_mining_observers_observer(observer_id,name, show_column_headings = true, version = "v1")
 {
  if (!observer_id) throw new Error(`observer_id is required`);
  return GESI.invoke('corporation_corporation_mining_observers_observer', { observer_id, name, show_column_headings, version })
}

/**
 * Public information about a corporation
 *
 * @param {number} corporation_id - An EVE corporation ID
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function corporations_corporation(corporation_id, show_column_headings = true, version = "v4")
 {
  if (!corporation_id) throw new Error(`corporation_id is required`);
  return GESI.invoke('corporations_corporation', { corporation_id, show_column_headings, version })
}

/**
 * Get a list of all the alliances a corporation has been a member of
 *
 * @param {number} corporation_id - An EVE corporation ID
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function corporations_corporation_alliancehistory(corporation_id, show_column_headings = true, version = "v2")
 {
  if (!corporation_id) throw new Error(`corporation_id is required`);
  return GESI.invoke('corporations_corporation_alliancehistory', { corporation_id, show_column_headings, version })
}

/**
 * Return a list of the corporation assets
 *
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function corporations_corporation_assets(name, show_column_headings = true, version = "v4")
 {
  return GESI.invoke('corporations_corporation_assets', { name, show_column_headings, version });
}

/**
 * Return locations for a set of item ids, which you can get from corporation assets endpoint. Coordinates for items in hangars or stations are set to (-1,0,0)
 *
 * @param {number[]} item_ids - A list of item ids
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function corporations_corporation_assets_locations(item_ids,name, show_column_headings = true, version = "v1")
 {
  if (!item_ids) throw new Error(`item_ids is required`);
  return GESI.invoke('corporations_corporation_assets_locations', { item_ids, name, show_column_headings, version });
}

/**
 * Return names for a set of item ids, which you can get from corporation assets endpoint. Only valid for items that can customize names, like containers or ships
 *
 * @param {number[]} item_ids - A list of item ids
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function corporations_corporation_assets_names(item_ids,name, show_column_headings = true, version = "v1")
 {
  if (!item_ids) throw new Error(`item_ids is required`);
  return GESI.invoke('corporations_corporation_assets_names', { item_ids, name, show_column_headings, version });
}

/**
 * Returns a list of blueprints the corporation owns
 *
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function corporations_corporation_blueprints(name, show_column_headings = true, version = "v2")
 {
  return GESI.invoke('corporations_corporation_blueprints', { name, show_column_headings, version })
}

/**
 * A list of your corporation's bookmarks
 *
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function corporations_corporation_bookmarks(name, show_column_headings = true, version = "v1")
 {
  return GESI.invoke('corporations_corporation_bookmarks', { name, show_column_headings, version })
}

/**
 * A list of your corporation's bookmark folders
 *
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function corporations_corporation_bookmarks_folders(name, show_column_headings = true, version = "v1")
 {
  return GESI.invoke('corporations_corporation_bookmarks_folders', { name, show_column_headings, version })
}

/**
 * Return contacts of a corporation
 *
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function corporations_corporation_contacts(name, show_column_headings = true, version = "v1")
 {
  return GESI.invoke('corporations_corporation_contacts', { name, show_column_headings, version })
}

/**
 * Return custom labels for a corporation's contacts
 *
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function corporations_corporation_contacts_labels(name, show_column_headings = true, version = "v1")
 {
  return GESI.invoke('corporations_corporation_contacts_labels', { name, show_column_headings, version })
}

/**
 * Returns logs recorded in the past seven days from all audit log secure containers (ALSC) owned by a given corporation
 *
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function corporations_corporation_containers_logs(name, show_column_headings = true, version = "v2")
 {
  return GESI.invoke('corporations_corporation_containers_logs', { name, show_column_headings, version })
}

/**
 * Returns contracts available to a corporation, only if the corporation is issuer, acceptor or assignee. Only returns contracts no older than 29 days, or if the status is "in_progress".
 *
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function corporations_corporation_contracts(name, show_column_headings = true, version = "v1")
 {
  return GESI.invoke('corporations_corporation_contracts', { name, show_column_headings, version })
}

/**
 * Lists bids on a particular auction contract
 *
 * @param {number} contract_id - ID of a contract
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function corporations_corporation_contracts_contract_bids(contract_id,name, show_column_headings = true, version = "v1")
 {
  if (!contract_id) throw new Error(`contract_id is required`);
  return GESI.invoke('corporations_corporation_contracts_contract_bids', { contract_id, name, show_column_headings, version })
}

/**
 * Lists items of a particular contract
 *
 * @param {number} contract_id - ID of a contract
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function corporations_corporation_contracts_contract_items(contract_id,name, show_column_headings = true, version = "v1")
 {
  if (!contract_id) throw new Error(`contract_id is required`);
  return GESI.invoke('corporations_corporation_contracts_contract_items', { contract_id, name, show_column_headings, version })
}

/**
 * List customs offices owned by a corporation
 *
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function corporations_corporation_customs_offices(name, show_column_headings = true, version = "v1")
 {
  return GESI.invoke('corporations_corporation_customs_offices', { name, show_column_headings, version })
}

/**
 * Return corporation hangar and wallet division names, only show if a division is not using the default name
 *
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function corporations_corporation_divisions(name, show_column_headings = true, version = "v1")
 {
  return GESI.invoke('corporations_corporation_divisions', { name, show_column_headings, version })
}

/**
 * Return a corporation's facilities
 *
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function corporations_corporation_facilities(name, show_column_headings = true, version = "v1")
 {
  return GESI.invoke('corporations_corporation_facilities', { name, show_column_headings, version })
}

/**
 * Statistics about a corporation involved in faction warfare
 *
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function corporations_corporation_fw_stats(name, show_column_headings = true, version = "v1")
 {
  return GESI.invoke('corporations_corporation_fw_stats', { name, show_column_headings, version })
}

/**
 * Get the icon urls for a corporation
 *
 * @param {number} corporation_id - An EVE corporation ID
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function corporations_corporation_icons(corporation_id, show_column_headings = true, version = "v1")
 {
  if (!corporation_id) throw new Error(`corporation_id is required`);
  return GESI.invoke('corporations_corporation_icons', { corporation_id, show_column_headings, version })
}

/**
 * List industry jobs run by a corporation
 *
 * @param {boolean} include_completed - Whether to retrieve completed corporation industry jobs. Only includes jobs from the past 89 days
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function corporations_corporation_industry_jobs(include_completed,name, show_column_headings = true, version = "v1")
 {
  return GESI.invoke('corporations_corporation_industry_jobs', { include_completed, name, show_column_headings, version });
}

/**
 * Get a list of a corporation's kills and losses going back 89 days
 *
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function corporations_corporation_killmails_recent(name, show_column_headings = true, version = "v1")
 {
  return GESI.invoke('corporations_corporation_killmails_recent', { name, show_column_headings, version })
}

/**
 * Returns a corporation's medals
 *
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function corporations_corporation_medals(name, show_column_headings = true, version = "v1")
 {
  return GESI.invoke('corporations_corporation_medals', { name, show_column_headings, version })
}

/**
 * Returns medals issued by a corporation
 *
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function corporations_corporation_medals_issued(name, show_column_headings = true, version = "v1")
 {
  return GESI.invoke('corporations_corporation_medals_issued', { name, show_column_headings, version })
}

/**
 * Return the current member list of a corporation, the token's character need to be a member of the corporation.
 *
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function corporations_corporation_members(name, show_column_headings = true, version = "v3")
 {
  return GESI.invoke('corporations_corporation_members', { name, show_column_headings, version })
}

/**
 * Return a corporation's member limit, not including CEO himself
 *
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function corporations_corporation_members_limit(name, show_column_headings = true, version = "v1")
 {
  return GESI.invoke('corporations_corporation_members_limit', { name, show_column_headings, version })
}

/**
 * Returns a corporation's members' titles
 *
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function corporations_corporation_members_titles(name, show_column_headings = true, version = "v1")
 {
  return GESI.invoke('corporations_corporation_members_titles', { name, show_column_headings, version })
}

/**
 * Returns additional information about a corporation's members which helps tracking their activities
 *
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function corporations_corporation_membertracking(name, show_column_headings = true, version = "v1")
 {
  return GESI.invoke('corporations_corporation_membertracking', { name, show_column_headings, version })
}

/**
 * List open market orders placed on behalf of a corporation
 *
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function corporations_corporation_orders(name, show_column_headings = true, version = "v2")
 {
  return GESI.invoke('corporations_corporation_orders', { name, show_column_headings, version });
}

/**
 * List cancelled and expired market orders placed on behalf of a corporation up to 89 days in the past.
 *
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function corporations_corporation_orders_history(name, show_column_headings = true, version = "v1")
 {
  return GESI.invoke('corporations_corporation_orders_history', { name, show_column_headings, version })
}

/**
 * Return the roles of all members if the character has the personnel manager role or any grantable role.
 *
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function corporations_corporation_roles(name, show_column_headings = true, version = "v1")
 {
  return GESI.invoke('corporations_corporation_roles', { name, show_column_headings, version })
}

/**
 * Return how roles have changed for a coporation's members, up to a month
 *
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function corporations_corporation_roles_history(name, show_column_headings = true, version = "v1")
 {
  return GESI.invoke('corporations_corporation_roles_history', { name, show_column_headings, version })
}

/**
 * Return the current shareholders of a corporation.
 *
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function corporations_corporation_shareholders(name, show_column_headings = true, version = "v1")
 {
  return GESI.invoke('corporations_corporation_shareholders', { name, show_column_headings, version })
}

/**
 * Return corporation standings from agents, NPC corporations, and factions
 *
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function corporations_corporation_standings(name, show_column_headings = true, version = "v1")
 {
  return GESI.invoke('corporations_corporation_standings', { name, show_column_headings, version })
}

/**
 * Returns list of corporation starbases (POSes)
 *
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function corporations_corporation_starbases(name, show_column_headings = true, version = "v1")
 {
  return GESI.invoke('corporations_corporation_starbases', { name, show_column_headings, version })
}

/**
 * Returns various settings and fuels of a starbase (POS)
 *
 * @param {number} system_id - The solar system this starbase (POS) is located in,
 * @param {number} starbase_id - An EVE starbase (POS) ID
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function corporations_corporation_starbases_starbase(system_id, starbase_id,name, show_column_headings = true, version = "v1")
 {
  if (!system_id) throw new Error(`system_id is required`);
  if (!starbase_id) throw new Error(`starbase_id is required`);
  return GESI.invoke('corporations_corporation_starbases_starbase', { system_id, starbase_id, name, show_column_headings, version })
}

/**
 * Get a list of corporation structures. This route's version includes the changes to structures detailed in this blog: https://www.eveonline.com/article/upwell-3.0-structures-changes-coming-on-february-13th
 *
 * @param {string} language - Language to use in the response, takes precedence over Accept-Language
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function corporations_corporation_structures(languagename,name, show_column_headings = true, version = "v3")
 {
  return GESI.invoke('corporations_corporation_structures', { language, name, show_column_headings, version })
}

/**
 * Returns a corporation's titles
 *
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function corporations_corporation_titles(name, show_column_headings = true, version = "v1")
 {
  return GESI.invoke('corporations_corporation_titles', { name, show_column_headings, version })
}

/**
 * Get a corporation's wallets
 *
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function corporations_corporation_wallets(name, show_column_headings = true, version = "v1")
 {
  return GESI.invoke('corporations_corporation_wallets', { name, show_column_headings, version })
}

/**
 * Retrieve the given corporation's wallet journal for the given division going 29 days back
 *
 * @param {number} division - Wallet key of the division to fetch journals from
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function corporations_corporation_wallets_division_journal(division,name, show_column_headings = true, version = "v3")
 {
  if (!division) throw new Error(`division is required`);
  return GESI.invoke('corporations_corporation_wallets_division_journal', { division, name, show_column_headings, version })
}

/**
 * Get wallet transactions of a corporation
 *
 * @param {number} division - Wallet key of the division to fetch journals from
 * @param {number} from_id - Only show journal entries happened before the transaction referenced by this id
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function corporations_corporation_wallets_division_transactions(division, from_id,name, show_column_headings = true, version = "v1")
 {
  if (!division) throw new Error(`division is required`);
  return GESI.invoke('corporations_corporation_wallets_division_transactions', { division, from_id, name, show_column_headings, version })
}

/**
 * Get a list of npc corporations
 *
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function corporations_npccorps(show_column_headings = true, version = "v1")
 {
  return GESI.invoke('corporations_npccorps', { show_column_headings, version });
}

/**
 * Get a list of dogma attribute ids
 *
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function dogma_attributes(show_column_headings = true, version = "v1")
 {
  return GESI.invoke('dogma_attributes', { show_column_headings, version });
}

/**
 * Get information on a dogma attribute
 *
 * @param {number} attribute_id - A dogma attribute ID
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function dogma_attributes_attribute(attribute_id, show_column_headings = true, version = "v1")
 {
  if (!attribute_id) throw new Error(`attribute_id is required`);
  return GESI.invoke('dogma_attributes_attribute', { attribute_id, show_column_headings, version })
}

/**
 * Returns info about a dynamic item resulting from mutation with a mutaplasmid.
 *
 * @param {number} type_id - type_id integer
 * @param {number} item_id - item_id integer
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function dogma_dynamic_items_type_item(type_id, item_id, show_column_headings = true, version = "v1")
 {
  if (!type_id) throw new Error(`type_id is required`);
  if (!item_id) throw new Error(`item_id is required`);
  return GESI.invoke('dogma_dynamic_items_type_item', { type_id, item_id, show_column_headings, version })
}

/**
 * Get a list of dogma effect ids
 *
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function dogma_effects(show_column_headings = true, version = "v1")
 {
  return GESI.invoke('dogma_effects', { show_column_headings, version })
}

/**
 * Get information on a dogma effect
 *
 * @param {number} effect_id - A dogma effect ID
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function dogma_effects_effect(effect_id, show_column_headings = true, version = "v1")
 {
  if (!effect_id) throw new Error(`effect_id is required`);
  return GESI.invoke('dogma_effects_effect', { effect_id, show_column_headings, version })
}

/**
 * Search for entities that match a given sub-string.
 *
 * @param {string} search - The string to search on
 * @param {string[]} categories - Type of entities to search for
 * @param {string} language - Language to use in the response, takes precedence over Accept-Language
 * @param {boolean} strict - Whether the search should be a strict match
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function eve_search(search, categories, language, strict, show_column_headings = true, version = "v1")
 {
  if (!search) throw new Error(`search is required`);
  if (!categories) throw new Error(`categories is required`);
  return GESI.invoke('eve_search', { search, categories, language, strict, show_column_headings, version })
}

/**
 * EVE Server status
 *
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function eve_status(show_column_headings = true, version = "v1")
 {
  return GESI.invoke('eve_status', { show_column_headings, version });
}

/**
 * Return details about a fleet
 *
 * @param {number} fleet_id - ID for a fleet
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function fleets_fleet(fleet_id,name, show_column_headings = true, version = "v1")
 {
  if (!fleet_id) throw new Error(`fleet_id is required`);
  return GESI.invoke('fleets_fleet', { fleet_id, name, show_column_headings, version })
}

/**
 * Return information about fleet members
 *
 * @param {number} fleet_id - ID for a fleet
 * @param {string} language - Language to use in the response, takes precedence over Accept-Language
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function fleets_fleet_members(fleet_id, languagename,name, show_column_headings = true, version = "v1")
 {
  if (!fleet_id) throw new Error(`fleet_id is required`);
  return GESI.invoke('fleets_fleet_members', { fleet_id, language, name, show_column_headings, version })
}

/**
 * Return information about wings in a fleet
 *
 * @param {number} fleet_id - ID for a fleet
 * @param {string} language - Language to use in the response, takes precedence over Accept-Language
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function fleets_fleet_wings(fleet_id, languagename,name, show_column_headings = true, version = "v1")
 {
  if (!fleet_id) throw new Error(`fleet_id is required`);
  return GESI.invoke('fleets_fleet_wings', { fleet_id, language, name, show_column_headings, version })
}

/**
 * Top 3 leaderboard of factions for kills and victory points separated by total, last week and yesterday
 *
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function fw_leaderboards(show_column_headings = true, version = "v1")
 {
  return GESI.invoke('fw_leaderboards', { show_column_headings, version })
}

/**
 * Top 99 leaderboard of pilots for kills and victory points separated by total, last week and yesterday
 *
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function fw_leaderboards_characters(show_column_headings = true, version = "v1")
 {
  return GESI.invoke('fw_leaderboards_characters', { show_column_headings, version })
}

/**
 * Top 9 leaderboard of corporations for kills and victory points separated by total, last week and yesterday
 *
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function fw_leaderboards_corporations(show_column_headings = true, version = "v1")
 {
  return GESI.invoke('fw_leaderboards_corporations', { show_column_headings, version })
}

/**
 * Statistical overviews of factions involved in faction warfare
 *
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function fw_stats(show_column_headings = true, version = "v1")
 {
  return GESI.invoke('fw_stats', { show_column_headings, version })
}

/**
 * An overview of the current ownership of faction warfare solar systems
 *
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function fw_systems(show_column_headings = true, version = "v1")
 {
  return GESI.invoke('fw_systems', { show_column_headings, version })
}

/**
 * Data about which NPC factions are at war
 *
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function fw_wars(show_column_headings = true, version = "v1")
 {
  return GESI.invoke('fw_wars', { show_column_headings, version })
}

/**
 * Return a list of current incursions
 *
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function incursions(show_column_headings = true, version = "v1")
 {
  return GESI.invoke('incursions', { show_column_headings, version })
}

/**
 * Return a list of industry facilities
 *
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function industry_facilities(show_column_headings = true, version = "v1")
 {
  return GESI.invoke('industry_facilities', { show_column_headings, version })
}

/**
 * Return cost indices for solar systems
 *
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function industry_systems(show_column_headings = true, version = "v1")
 {
  return GESI.invoke('industry_systems', { show_column_headings, version })
}

/**
 * Return available insurance levels for all ship types
 *
 * @param {string} language - Language to use in the response, takes precedence over Accept-Language
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function insurance_prices(languagename, show_column_headings = true, version = "v1")
 {
  return GESI.invoke('insurance_prices', { language, show_column_headings, version })
}

/**
 * Return a single killmail from its ID and hash
 *
 * @param {number} killmail_id - The killmail ID to be queried
 * @param {string} killmail_hash - The killmail hash for verification
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function killmails_killmail_killmail_hash(killmail_id, killmail_hash, show_column_headings = true, version = "v1")
 {
  if (!killmail_id) throw new Error(`killmail_id is required`);
  if (!killmail_hash) throw new Error(`killmail_hash is required`);
  return GESI.invoke('killmails_killmail_killmail_hash', { killmail_id, killmail_hash, show_column_headings, version })
}

/**
 * Return a list of offers from a specific corporation's loyalty store
 *
 * @param {number} corporation_id - An EVE corporation ID
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function loyalty_stores_corporation_offers(corporation_id, show_column_headings = true, version = "v1")
 {
  if (!corporation_id) throw new Error(`corporation_id is required`);
  return GESI.invoke('loyalty_stores_corporation_offers', { corporation_id, show_column_headings, version })
}

/**
 * Get a list of item groups
 *
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function markets_groups(show_column_headings = true, version = "v1")
 {
  return GESI.invoke('markets_groups', { show_column_headings, version })
}

/**
 * Get information on an item group
 *
 * @param {number} market_group_id - An Eve item group ID
 * @param {string} language - Language to use in the response, takes precedence over Accept-Language
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function markets_groups_market_group(market_group_id, languagename, show_column_headings = true, version = "v1")
 {
  if (!market_group_id) throw new Error(`market_group_id is required`);
  return GESI.invoke('markets_groups_market_group', { market_group_id, language, show_column_headings, version })
}

/**
 * Return a list of prices
 *
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function markets_prices(show_column_headings = true, version = "v1")
 {
  return GESI.invoke('markets_prices', { show_column_headings, version })
}

/**
 * Return a list of historical market statistics for the specified type in a region
 *
 * @param {number} type_id - Return statistics for this type
 * @param {number} region_id - Return statistics in this region
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function markets_region_history(type_id, region_id, show_column_headings = true, version = "v1")
 {
  if (!type_id) throw new Error(`type_id is required`);
  if (!region_id) throw new Error(`region_id is required`);
  return GESI.invoke('markets_region_history', { type_id, region_id, show_column_headings, version })
}

/**
 * Return a list of orders in a region
 *
 * @param {number} region_id - Return orders in this region
 * @param {string} order_type - Filter buy/sell orders, return all orders by default. If you query without type_id, we always return both buy and sell orders
 * @param {number} type_id - Return orders only for this type
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function markets_region_orders(region_id, order_type, type_id, show_column_headings = true, version = "v1")
 {
  if (!region_id) throw new Error(`region_id is required`);
  if (!order_type) throw new Error(`order_type is required`);
  return GESI.invoke('markets_region_orders', { region_id, order_type, type_id, show_column_headings, version })
}

/**
 * Return a list of type IDs that have active orders in the region, for efficient market indexing.
 *
 * @param {number} region_id - Return statistics in this region
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function markets_region_types(region_id, show_column_headings = true, version = "v1")
 {
  if (!region_id) throw new Error(`region_id is required`);
  return GESI.invoke('markets_region_types', { region_id, show_column_headings, version })
}

/**
 * Return all orders in a structure
 *
 * @param {number} structure_id - Return orders in this structure
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function markets_structures_structure(structure_id,name, show_column_headings = true, version = "v1")
 {
  if (!structure_id) throw new Error(`structure_id is required`);
  return GESI.invoke('markets_structures_structure', { structure_id, name, show_column_headings, version })
}

/**
 * Return a list of opportunities groups
 *
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function opportunities_groups(show_column_headings = true, version = "v1")
 {
  return GESI.invoke('opportunities_groups', { show_column_headings, version })
}

/**
 * Return information of an opportunities group
 *
 * @param {number} group_id - ID of an opportunities group
 * @param {string} language - Language to use in the response, takes precedence over Accept-Language
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function opportunities_groups_group(group_id, languagename, show_column_headings = true, version = "v1")
 {
  if (!group_id) throw new Error(`group_id is required`);
  return GESI.invoke('opportunities_groups_group', { group_id, language, show_column_headings, version })
}

/**
 * Return a list of opportunities tasks
 *
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function opportunities_tasks(show_column_headings = true, version = "v1")
 {
  return GESI.invoke('opportunities_tasks', { show_column_headings, version })
}

/**
 * Return information of an opportunities task
 *
 * @param {number} task_id - ID of an opportunities task
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function opportunities_tasks_task(task_id, show_column_headings = true, version = "v1")
 {
  if (!task_id) throw new Error(`task_id is required`);
  return GESI.invoke('opportunities_tasks_task', { task_id, show_column_headings, version })
}

/**
 * Get the systems between origin and destination
 *
 * @param {number} origin - origin solar system ID
 * @param {number} destination - destination solar system ID
 * @param {number[]} avoid - avoid solar system ID(s)
 * @param {number[]} connections - connected solar system pairs
 * @param {string} flag - route security preference
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function route_origin_destination(origin, destination, avoid, connections, flagname, show_column_headings = true, version = "v1")
 {
  if (!origin) throw new Error(`origin is required`);
  if (!destination) throw new Error(`destination is required`);
  return GESI.invoke('route_origin_destination', { origin, destination, avoid, connections, flag, show_column_headings, version })
}

/**
 * Shows sovereignty data for campaigns.
 *
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function sovereignty_campaigns(show_column_headings = true, version = "v1")
 {
  return GESI.invoke('sovereignty_campaigns', { show_column_headings, version })
}

/**
 * Shows sovereignty information for solar systems
 *
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function sovereignty_map(show_column_headings = true, version = "v1")
 {
  return GESI.invoke('sovereignty_map', { show_column_headings, version })
}

/**
 * Shows sovereignty data for structures.
 *
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function sovereignty_structures(show_column_headings = true, version = "v1")
 {
  return GESI.invoke('sovereignty_structures', { show_column_headings, version })
}

/**
 * Get all character ancestries
 *
 * @param {string} language - Language to use in the response, takes precedence over Accept-Language
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function universe_ancestries(languagename, show_column_headings = true, version = "v1")
 {
  return GESI.invoke('universe_ancestries', { language, show_column_headings, version })
}

/**
 * Get information on an asteroid belt
 *
 * @param {number} asteroid_belt_id - asteroid_belt_id integer
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function universe_asteroid_belts_asteroid_belt(asteroid_belt_id, show_column_headings = true, version = "v1")
 {
  if (!asteroid_belt_id) throw new Error(`asteroid_belt_id is required`);
  return GESI.invoke('universe_asteroid_belts_asteroid_belt', { asteroid_belt_id, show_column_headings, version })
}

/**
 * Get a list of bloodlines
 *
 * @param {string} language - Language to use in the response, takes precedence over Accept-Language
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function universe_bloodlines(languagename, show_column_headings = true, version = "v1")
 {
  return GESI.invoke('universe_bloodlines', { language, show_column_headings, version })
}

/**
 * Get a list of item categories
 *
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function universe_categories(show_column_headings = true, version = "v1")
 {
  return GESI.invoke('universe_categories', { show_column_headings, version })
}

/**
 * Get information of an item category
 *
 * @param {number} category_id - An Eve item category ID
 * @param {string} language - Language to use in the response, takes precedence over Accept-Language
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function universe_categories_category(category_id, languagename, show_column_headings = true, version = "v1")
 {
  if (!category_id) throw new Error(`category_id is required`);
  return GESI.invoke('universe_categories_category', { category_id, language, show_column_headings, version })
}

/**
 * Get a list of constellations
 *
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function universe_constellations(show_column_headings = true, version = "v1")
 {
  return GESI.invoke('universe_constellations', { show_column_headings, version })
}

/**
 * Get information on a constellation
 *
 * @param {number} constellation_id - constellation_id integer
 * @param {string} language - Language to use in the response, takes precedence over Accept-Language
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function universe_constellations_constellation(constellation_id, languagename, show_column_headings = true, version = "v1")
 {
  if (!constellation_id) throw new Error(`constellation_id is required`);
  return GESI.invoke('universe_constellations_constellation', { constellation_id, language, show_column_headings, version })
}

/**
 * Get a list of factions
 *
 * @param {string} language - Language to use in the response, takes precedence over Accept-Language
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function universe_factions(languagename, show_column_headings = true, version = "v1")
 {
  return GESI.invoke('universe_factions', { language, show_column_headings, version })
}

/**
 * Get a list of graphics
 *
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function universe_graphics(show_column_headings = true, version = "v1")
 {
  return GESI.invoke('universe_graphics', { show_column_headings, version })
}

/**
 * Get information on a graphic
 *
 * @param {number} graphic_id - graphic_id integer
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function universe_graphics_graphic(graphic_id, show_column_headings = true, version = "v1")
 {
  if (!graphic_id) throw new Error(`graphic_id is required`);
  return GESI.invoke('universe_graphics_graphic', { graphic_id, show_column_headings, version })
}

/**
 * Get a list of item groups
 *
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function universe_groups(show_column_headings = true, version = "v1")
 {
  return GESI.invoke('universe_groups', { show_column_headings, version })
}

/**
 * Get information on an item group
 *
 * @param {number} group_id - An Eve item group ID
 * @param {string} language - Language to use in the response, takes precedence over Accept-Language
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function universe_groups_group(group_id, languagename, show_column_headings = true, version = "v1")
 {
  if (!group_id) throw new Error(`group_id is required`);
  return GESI.invoke('universe_groups_group', { group_id, language, show_column_headings, version })
}

/**
 * Resolve a set of names to IDs in the following categories: agents, alliances, characters, constellations, corporations factions, inventory_types, regions, stations, and systems. Only exact matches will be returned. All names searched for are cached for 11 hours
 *
 * @param {string[]} names - The names to resolve
 * @param {string} language - Language to use in the response, takes precedence over Accept-Language
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function universe_ids(names, languagename, show_column_headings = true, version = "v1")
 {
  if (!names) throw new Error(`names is required`);
  return GESI.invoke('universe_ids', { names, language, show_column_headings, version })
}

/**
 * Get information on a moon
 *
 * @param {number} moon_id - moon_id integer
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function universe_moons_moon(moon_id, show_column_headings = true, version = "v1")
 {
  if (!moon_id) throw new Error(`moon_id is required`);
  return GESI.invoke('universe_moons_moon', { moon_id, show_column_headings, version })
}

/**
 * Resolve a set of IDs to names and categories. Supported ID's for resolving are: Characters, Corporations, Alliances, Stations, Solar Systems, Constellations, Regions, Types, Factions
 *
 * @param {number[]} ids - The ids to resolve
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function universe_names(ids, show_column_headings = true, version = "v2")
 {
  if (!ids) throw new Error(`ids is required`);
  return GESI.invoke('universe_names', { ids, show_column_headings, version })
}

/**
 * Get information on a planet
 *
 * @param {number} planet_id - planet_id integer
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function universe_planets_planet(planet_id, show_column_headings = true, version = "v1")
 {
  if (!planet_id) throw new Error(`planet_id is required`);
  return GESI.invoke('universe_planets_planet', { planet_id, show_column_headings, version })
}

/**
 * Get a list of character races
 *
 * @param {string} language - Language to use in the response, takes precedence over Accept-Language
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function universe_races(languagename, show_column_headings = true, version = "v1")
 {
  return GESI.invoke('universe_races', { language, show_column_headings, version })
}

/**
 * Get a list of regions
 *
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function universe_regions(show_column_headings = true, version = "v1")
 {
  return GESI.invoke('universe_regions', { show_column_headings, version })
}

/**
 * Get information on a region
 *
 * @param {number} region_id - region_id integer
 * @param {string} language - Language to use in the response, takes precedence over Accept-Language
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function universe_regions_region(region_id, languagename, show_column_headings = true, version = "v1")
 {
  if (!region_id) throw new Error(`region_id is required`);
  return GESI.invoke('universe_regions_region', { region_id, language, show_column_headings, version })
}

/**
 * Get information on a planetary factory schematic
 *
 * @param {number} schematic_id - A PI schematic ID
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function universe_schematics_schematic(schematic_id, show_column_headings = true, version = "v1")
 {
  if (!schematic_id) throw new Error(`schematic_id is required`);
  return GESI.invoke('universe_schematics_schematic', { schematic_id, show_column_headings, version })
}

/**
 * Get information on a stargate
 *
 * @param {number} stargate_id - stargate_id integer
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function universe_stargates_stargate(stargate_id, show_column_headings = true, version = "v1")
 {
  if (!stargate_id) throw new Error(`stargate_id is required`);
  return GESI.invoke('universe_stargates_stargate', { stargate_id, show_column_headings, version })
}

/**
 * Get information on a star
 *
 * @param {number} star_id - star_id integer
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function universe_stars_star(star_id, show_column_headings = true, version = "v1")
 {
  if (!star_id) throw new Error(`star_id is required`);
  return GESI.invoke('universe_stars_star', { star_id, show_column_headings, version })
}

/**
 * Get information on a station
 *
 * @param {number} station_id - station_id integer
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function universe_stations_station(station_id, show_column_headings = true, version = "v1")
 {
  if (!station_id) throw new Error(`station_id is required`);
  return GESI.invoke('universe_stations_station', { station_id, show_column_headings, version })
}

/**
 * List all public structures
 *
 * @param {string} filter - Only list public structures that have this service online
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function universe_structures(filtername, show_column_headings = true, version = "v1")
 {
  return GESI.invoke('universe_structures', { filter, show_column_headings, version })
}

/**
 * Returns information on requested structure if you are on the ACL. Otherwise, returns "Forbidden" for all inputs.
 *
 * @param {number} structure_id - An Eve structure ID
 * @param {string} name - Name of the character used for auth. Defaults to the first authenticated character.
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function universe_structures_structure(structure_id,name, show_column_headings = true, version = "v1")
 {
  if (!structure_id) throw new Error(`structure_id is required`);
  return GESI.invoke('universe_structures_structure', { structure_id, name, show_column_headings, version })
}

/**
 * Get the number of jumps in solar systems within the last hour ending at the timestamp of the Last-Modified header, excluding wormhole space. Only systems with jumps will be listed
 *
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function universe_system_jumps(show_column_headings = true, version = "v1")
 {
  return GESI.invoke('universe_system_jumps', { show_column_headings, version })
}

/**
 * Get the number of ship, pod and NPC kills per solar system within the last hour ending at the timestamp of the Last-Modified header, excluding wormhole space. Only systems with kills will be listed
 *
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function universe_system_kills(show_column_headings = true, version = "v1")
 {
  return GESI.invoke('universe_system_kills', { show_column_headings, version })
}


/**
 * Get a list of solar systems
 *
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function universe_systems(show_column_headings = true, version = "v1")
 {
  return GESI.invoke('universe_systems', { show_column_headings, version })
}

/**
 * Get information on a solar system.
 *
 * @param {number} system_id - system_id integer
 * @param {string} language - Language to use in the response, takes precedence over Accept-Language
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function universe_systems_system(system_id, languagename, show_column_headings = true, version = "v3")
 {
  if (!system_id) throw new Error(`system_id is required`);
  return GESI.invoke('universe_systems_system', { system_id, language, show_column_headings, version })
}

/**
 * Get a list of type ids
 *
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function universe_types(show_column_headings = true, version = "v1")
 {
  return GESI.invoke('universe_types', { show_column_headings, version })
}

/**
 * Get information on a type
 *
 * @param {number} type_id - An Eve item type ID
 * @param {string} language - Language to use in the response, takes precedence over Accept-Language
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function universe_types_type(type_id, languagename, show_column_headings = true, version = "v2")
 {
  if (!type_id) throw new Error(`type_id is required`);
  return GESI.invoke('universe_types_type', { type_id, language, show_column_headings, version })
}

/**
 * Return a list of wars
 *
 * @param {number} max_war_id - Only return wars with ID smaller than this
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function wars(max_war_id, show_column_headings = true, version = "v2")
 {
  return GESI.invoke('wars', { max_war_id, show_column_headings, version })
}

/**
 * Return details about a war
 *
 * @param {number} war_id - ID for a war
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function wars_war(war_id, show_column_headings = true, version = "v2")
 {
  if (!war_id) throw new Error(`war_id is required`);
  return GESI.invoke('wars_war', { war_id, show_column_headings, version })
}

/**
 * Return a list of kills related to a war
 *
 * @param {number} war_id - A valid war ID
 * @param {boolean} show_column_headings - If column headings should be shown.
 * @param {string} version - Which ESI version to use for the request.
 * @customfunction
 */
function wars_war_killmails(war_id, show_column_headings = true, version = "v1")
 {
  if (!war_id) throw new Error(`war_id is required`);
  return GESI.invoke('wars_war_killmails', { war_id, show_column_headings, version })
}


/** Built in GSEI functions */


/**
 * @return {string[] | null} An array of character names that have authenticated, or null if none have been.
 * @customfunction
 */
function getAuthenticatedCharacterNames()
{
  return GESI.getAuthenticatedCharacterNames();
}

/**
 * Parses array data into more readable format
 *
 * @param {string} endpointName (Required) Name of the endpoint data to be parsed is from.
 * @param {string} columnName (Required) Name of the column to be parsed.
 * @param {string} data (Required) Cell that holds the data to be parsed.
 * @param {boolean} show_column_headers Default: True, Boolean if column headings should be listed or not.
 * @return Parsed array data.
 * @customfunction
 */
 function parseArray(endpointName, columnName, data, show_column_headers = true)
 {
  return GESI.parseArray(endpointName, columnName, data, show_column_headers);
 }

/**
 * @param {string} characterName The name of the character
 * @return {IAuthenticatedCharacter} A metadata object for this character
 * @customfunction
 */
 function getCharacterData(characterName)
 {
   return GESI.getCharacterData(characterName);
 }

 /**
 * Returns the data from the provided functionName for each character as one list for use within a sheet.
 *
 * @param {string} functionName The name of the endpoint that should be invoked
 * @param {string | string[]} characterNames A single, comma separated, or vertical range of character names
 * @param {object} params Any extra parameters that should be included in the ESI call
 * @return
 * @customfunction
 */
function invokeMultiple(functionName, characterNames, params)
{
  return GESI.invokeMultiple(functionName, characterNames, params);
}


/**
 * Return the sheets formatted data related for the given functionName.
 *
 * @param {string} functionName The name of the endpoint that should be invoked
 * @param {object} params Any extra parameters that should be included in the ESI call
 * @return The data from the provided functionName
 * @customfunction
 */
function invoke(functionName, params)
{
  return GESI.invoke(functionName, params);
}

/**
 * Returns an ESIClient for the given characterName.
 * Can be used by advanced users for custom functions/scripts.
 *
 * @param characterName
 * @return {ESIClient}
 * @customfunction
 */
 function getClient(characterName)
 {
   return GESI.getClient(characterName);
 }
