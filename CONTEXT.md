# Blaze It Club

The daily-SMS joke app: subscribers opt in with a phone number and receive one shared joke every day at their local 4:20pm.

## Language

**Subscriber**:
A phone number enrolled to receive the daily joke. Moves through three states: Pending, Active, Unsubscribed.
_Avoid_: User, customer, contact, recipient.

**Pending**:
A Subscriber who submitted the signup form but hasn't yet sent back a Confirmation; receives no jokes.

**Active**:
A Subscriber who has sent a Confirmation; receives the Joke of the Day.

**Unsubscribed**:
A Subscriber who replied STOP. The record is retained, never deleted. Signing up again starts a fresh Pending Subscriber, not a reactivation.
_Avoid_: Deleted, removed.

**Confirmation**:
The SMS reply (e.g. "YES") that moves a Subscriber from Pending to Active.

**Joke**:
A single scripted entry in the curated rotation, written with softened wording (see ADR-0001).

**Joke of the Day**:
The one Joke selected for a given calendar date and sent to every Active Subscriber that day; selection is deterministic and shared, not personalized per subscriber.
_Avoid_: Message, notification — too generic.

**Delivery Timezone**:
The timezone used to schedule a Subscriber's daily send. Pre-filled from the phone number's area code at signup but editable by the subscriber, since area codes don't always match where someone actually lives.
_Avoid_: Area code — implies fixed and unchangeable, which it isn't.

**Subscriber Cap**:
The maximum number of Pending + Active Subscribers allowed at once (~500). New signups are rejected once reached; an Unsubscribe frees a slot.
_Avoid_: Signup limit, waitlist — there's no waitlist, a rejected signup just doesn't go through.
