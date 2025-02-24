# IO5-6

## Project Overview

"IO5-6" is a resource management and automation game inspired by Universal Paperclips, themed around the dark and duality-driven concepts from the album IO by the band ten56. The game revolves around numbing the population by distributing a product called "I O 5-6," which strips away emotions and intellect, reflecting the album's exploration of duality (on/off, life/death, feeling/numbness).

### Core Objective

The player must numb 99.9% of the population by:

1. Harvesting Emotional Essence from the un-numbed population.
2. Producing doses using Emotional Essence.
3. Distributing doses manually or via automation.

## Key Features

- **Harvesting Emotional Essence**: Click a button to harvest essence from the un-numbed population.
- **Producing Doses**: Click a button to produce doses using Emotional Essence.
- **Distributing Doses**: Click a button to distribute doses manually or automate the process.
- **Upgrading Efficiencies**: Upgrade harvesting, production, distribution, and automation efficiencies.
- **Random Events**: Random events like resistance attacks, public outcries, equipment failures, and supply disruptions.
- **Milestones**: Milestones at 100, 500, and 999 numbed people with optional audio integration.
- **Endgame**: The player can "take the last dose" to terminate consciousness.

## Visual Style

- Minimalistic and dark theme.
- Text color fades from white to gray as the numbed population increases.

## Game Mechanics

### Harvesting Emotional Essence

- **Formula**: `essence_harvested = harvesting_efficiency * (un_numbed_population / 100)`
- **Event Impact**: During "public outcry," efficiency is halved for 3 seconds.

### Producing Doses

- **Cost**: `10 / production_efficiency` essence per dose.
- **Event Impact**: During "supply disruption," cost doubles for 3 seconds.

### Distributing Doses

- **Effect**: Numbs `distribution_efficiency` people per dose.

### Hiring Distributors

- **Cost**: `100 * (distributors + 1)` essence.
- **Effect**: Each distributor automates dose distribution.

### Automation

- **Real-Time Distribution**: Every `automation_interval / automation_efficiency` milliseconds, each distributor distributes one dose (if available).
- **Event Impact**: During "equipment failure," automation is disabled for 3 seconds.

### Upgrading Efficiencies

- **Costs**:
  - Harvesting Efficiency: `50 * (current_level + 1)` essence.
  - Production Efficiency: `50 * (current_level + 1)` essence.
  - Distribution Efficiency: `50 * (current_level + 1)` essence.
  - Automation Efficiency: `100 * (current_level + 1)` essence.

### Random Events

- **Trigger**: Every 10 seconds with a 10% chance per second.
- **Events**:
  - Resistance Attack: Destroys 1-5 doses.
  - Public Outcry: Halves harvesting efficiency for 3 seconds.
  - Equipment Failure: Disables automation for 3 seconds.
  - Supply Disruption: Doubles dose production cost for 3 seconds.

### Milestones

- **Triggers**: When Numbed Population reaches 100, 500, 999.
- **Effect**: Display a message and optionally play audio.

### Endgame

- **Condition**: When Un-Numbed Population ≤ 1 (99.9% numbed).
- **Action**: Prompt player to "take the last dose."
- **Effect**: If player selects "Yes," display "Consciousness terminated" and end the game.

## UI Elements

- **Resource Labels**: Display current values for Emotional Essence, Doses, Numbed Population, Un-Numbed Population, and Distributors.
- **Efficiency Labels**: Display current levels for Harvesting, Production, Distribution, and Automation efficiencies.
- **Action Buttons**: Buttons for harvesting, producing, distributing, hiring distributors, and upgrading efficiencies.
- **Event Log**: Display latest actions or events.
- **Visual Effects**: Text color fades from white to gray as numbed percentage increases.

## Integration with IO

- **Milestones**: Trigger messages and optionally play audio at 100, 500, and 999 numbed people.
- **Endgame**: The final message ties into the album's theme of duality and switching off.

## Future Improvements

- Suggestions for future features and enhancements based on the original prompt.
