# Project Prompt for "I O 5-6"

## Original Prompt

Below is a detailed and comprehensive prompt for building the game "I O 5-6". This prompt is designed to be clear, step-by-step, and optimized for an AI model to understand and replicate the game accurately. It covers the game's context, theme, mechanics, UI, audio integration, and implementation details, ensuring all specifics are captured.

---

### Prompt for Building "IO5-6"

#### Game Overview

You are tasked with building a game called "IO5-6". The game is a resource management and automation game inspired by Universal Paperclips, themed around the dark and duality-driven concepts from the album IO by the band ten56. The game's narrative revolves around numbing the population by distributing a product called "I O 5-6," which strips away emotions and intellect, reflecting the album's exploration of duality (on/off, life/death, feeling/numbness).

**Core Objective**

The player must numb 99.9% of the population by:

1. Harvesting Emotional Essence from the un-numbed population.
2. Producing doses using Emotional Essence.
3. Distributing doses manually or via automation.

**Visual Style**

- Minimalistic and dark, with a grayscale color scheme.
- Text fades from white to gray as the numbed population increases (e.g., #FFFFFF to #333333).

**Audio Integration (Optional)**

- Milestones can trigger album snippets or sound effects to enhance immersion and promote the album.

---

### Game Setup

**Platform**: web, iOS / Android app

**Scene**: A single scene with a Canvas for UI elements.

**Population**: Start with 1,000 un-numbed people (scalable for longer games).

**Resources**

- Emotional Essence: Harvested from un-numbed population.
- Doses: Produced using Emotional Essence.
- Numbed Population: People numbed by doses.
- Un-Numbed Population: People who can still produce Emotional Essence.
- Distributors: Automate dose distribution over time.

**Efficiencies (Upgradable)**

- Harvesting Efficiency: Increases essence harvested per action.
- Production Efficiency: Reduces essence cost per dose.
- Distribution Efficiency: Increases people numbed per dose.
- Automation Efficiency: Reduces the time interval between automated distributions.

**Initial Values**

- Emotional Essence: 0
- Doses: 0
- Numbed Population: 0
- Un-Numbed Population: 1,000
- Distributors: 0
- Harvesting Efficiency: 1
- Production Efficiency: 1
- Distribution Efficiency: 1
- Automation Efficiency: 1
- Automation Interval: 1 second (adjustable via upgrades)

---

### Game Mechanics

#### 1. Harvesting Emotional Essence

- **Action**: Player clicks a button to harvest essence.
- **Formula**: `essence_harvested = harvesting_efficiency * (un_numbed_population / 100)`
- **Event Impact**: During "public outcry," efficiency is halved for 3 seconds.
- **Implementation**:
  - On button click, calculate essence using the formula.
  - Add `essence_harvested` to total Emotional Essence.
  - Update UI to reflect new essence value.

#### 2. Producing Doses

- **Action**: Player clicks a button to produce a dose.
- **Cost**: `10 / production_efficiency` essence per dose.
- **Event Impact**: During "supply disruption," cost doubles for 3 seconds.
- **Implementation**:
  - Check if Emotional Essence >= cost.
  - If sufficient, subtract cost from Emotional Essence.
  - Add one dose to Doses.
  - Update UI to reflect new essence and dose values.

#### 3. Distributing Doses Manually

- **Action**: Player clicks a button to distribute a dose.
- **Effect**: Numbs `distribution_efficiency` people (up to available un-numbed population).
- **Implementation**:
  - Check if Doses >= 1 and Un-Numbed Population > 0.
  - If conditions met, subtract one dose from Doses.
  - Calculate `people_numbed = min(distribution_efficiency, un_numbed_population)`.
  - Add `people_numbed` to Numbed Population.
  - Subtract `people_numbed` from Un-Numbed Population.
  - Update UI to reflect new dose and population values.

#### 4. Hiring Distributors

- **Action**: Player clicks a button to hire a distributor.
- **Cost**: `100 * (distributors + 1)` essence.
- **Effect**: Each distributor automates dose distribution.
- **Implementation**:
  - Check if Emotional Essence >= cost.
  - If sufficient, subtract cost from Emotional Essence.
  - Increment Distributors by 1.
  - Update UI to reflect new essence and distributor values.

#### 5. Automation

- **Real-Time Distribution**: Every `automation_interval / automation_efficiency` milliseconds, each distributor distributes one dose (if available).
- **Effect**: Numbs `distribution_efficiency` people per dose distributed (up to available un-numbed population).
- **Event Impact**: During "equipment failure," automation is disabled for 3 seconds.
- **Implementation**:
  - Use a timer or loop to trigger automation tick at intervals.
  - For each tick:
    - Check if Distributors > 0 and Doses >= Distributors.
    - If conditions met, subtract Distributors from Doses.
    - For each distributor, calculate `people_numbed = min(distribution_efficiency, un_numbed_population)`.
    - Add `people_numbed * distributors` to Numbed Population.
    - Subtract `people_numbed * distributors` from Un-Numbed Population.
    - Update UI to reflect new dose and population values.
  - There should be automation for production of doses and harvesting too.

#### 6. Upgrading Efficiencies

- **Actions**: Separate buttons for each efficiency upgrade.
- **Cost**:
  - Harvesting Efficiency: `50 * (current_level + 1)` essence.
  - Production Efficiency: `50 * (current_level + 1)` essence.
  - Distribution Efficiency: `50 * (current_level + 1)` essence.
  - Automation Efficiency: `100 * (current_level + 1)` essence.
- **Effect**: Increment the respective efficiency level.
- **Implementation**:
  - For each upgrade button:
    - Check if Emotional Essence >= cost.
    - If sufficient, subtract cost from Emotional Essence.
    - Increment the respective efficiency level by 1.
    - Update UI to reflect new essence and efficiency values.

#### 7. Random Events

- **Trigger**: Every 10 seconds (adjustable), with a 10% chance per second.
- **Events**:
  - Resistance Attack: Destroys 1-5 doses (random).
    - Subtract `random(1, 5)` from Doses (minimum 0).
  - Public Outcry: Halves harvesting efficiency for 3 seconds.
    - Set `harvesting_efficiency = harvesting_efficiency / 2`.
    - After 3 seconds, restore original value.
  - Equipment Failure: Disables automation for 3 seconds.
    - Disable automation tick for 3 seconds.
  - Supply Disruption: Doubles dose production cost for 3 seconds.
    - Set `production_cost_multiplier = 2`.
    - After 3 seconds, reset to 1.
- **Implementation**:
  - Use a timer to check for events every second.
  - If event triggers (10% chance):
    - Set `event_active = true` and `event_type = [resistance_attack, public_outcry, equipment_failure, supply_disruption]`.
    - Apply event effect and start a 3-second timer.
    - After timer expires, reset event effects and set `event_active = false`.
    - Display event in event log (e.g., "Resistance attacked: 3 doses lost").

#### 8. Milestones

- **Triggers**: When Numbed Population reaches 100, 500, 999.
- **Effect**: Display a message (e.g., "Unlocked album snippet") and optionally play audio.
- **Implementation**:
  - After each distribution, check Numbed Population.
  - If a milestone is reached:
    - Display message in event log.
    - Optionally trigger audio playback (e.g., album snippet).
    - Ensure each milestone triggers only once.

#### 9. Endgame

- **Condition**: When Un-Numbed Population ≤ 1 (99.9% numbed).
- **Action**: Prompt player to "take the last dose."
- **Effect**: If player selects "Yes":
  - Display "Consciousness terminated."
  - End the game (e.g., freeze UI, disable buttons).
- **Implementation**:
  - After each distribution, check if Un-Numbed Population ≤ 1.
  - If condition met, display prompt UI with "Yes" and "No" buttons.
  - On "Yes" click, show endgame message and disable gameplay.
  - On "No" click, hide prompt and continue gameplay.

---

### UI Elements

**Canvas**: Contains all UI elements.

**Resource Labels (TextMeshPro)**:

- Emotional Essence: Display current value.
- Doses: Display current value.
- Numbed Population: Display current value.
- Un-Numbed Population: Display current value.
- Distributors: Display current value.

**Efficiency Labels (TextMeshPro)**:

- Harvesting Efficiency: Display current level.
- Production Efficiency: Display current level.
- Distribution Efficiency: Display current level.
- Automation Efficiency: Display current level.

**Action Buttons**:

- Harvest Essence.
- Produce Dose.
- Distribute Dose.
- Hire Distributor.
- Upgrade Harvesting Efficiency.
- Upgrade Production Efficiency.
- Upgrade Distribution Efficiency.
- Upgrade Automation Efficiency.

**Event Log (TextMeshPro)**:

- Display latest action or event (e.g., "Harvested 10 essence", "Public outcry: Efficiency halved").

**Visual Effects**:

- Text color fades from white (#FFFFFF) to gray (#333333) as numbed percentage increases.
- Formula: `color = lerp(#FFFFFF, #333333, numbed_population / total_population)`.

**UI Layout**

- Top Section: Resource labels arranged horizontally.
- Middle Section: Efficiency labels arranged horizontally.
- Bottom Section: Action buttons arranged in a grid (e.g., 2x4 layout).
- Event Log: Below buttons, scrollable if needed.

**Real-Time Updates**

- The game should update the UI in real-time to reflect resource changes, efficiency levels, and automation effects.

---

### Integration with IO

**Milestones**:

- When the player numbs 100, 500, or 999 people:
  - Display message in event log (e.g., "Unlocked album snippet").
  - Optionally play audio (e.g., album snippet or sound effect).
  - Optionally display album art or related visuals.

**Endgame**:

- The final message "Consciousness terminated" ties into the album's theme of duality and switching off.

---

### Implementation Steps

#### 1. Set Up Variables

Create variables for all resources, efficiencies, and game states:

- `emotional_essence` (float).
- `doses` (int).
- `numbed_population` (int).
- `un_numbed_population` (int).
- `distributors` (int).
- `harvesting_efficiency` (float).
- `production_efficiency` (float).
- `distribution_efficiency` (float).
- `automation_efficiency` (float).
- `automation_interval` (float, default 1 second).
- `event_active` (bool).
- `event_type` (enum: resistance_attack, public_outcry, equipment_failure, supply_disruption).
- `production_cost_multiplier` (float, default 1).
- `milestones_reached` (list of int, e.g., [100, 500, 999]).

#### 2. UI Setup

- Add a Canvas with scaling mode "Scale With Screen Size."
- Add TextMeshPro labels for resources and efficiencies.
- Add Buttons for actions.

#### 3. Action Logic

For each action (harvest, produce, distribute, hire, upgrade):

- Create a flow that checks conditions (e.g., enough essence, doses available).
- Update variables based on formulas.
- Refresh UI labels to reflect new values.

#### 4. Automation Logic

- Use a timer or loop to trigger the automation tick at intervals:
  - Calculate interval: `automation_interval / automation_efficiency`.
  - For each tick, distribute doses based on number of distributors.
  - Update populations and UI accordingly.
  - If `event_active` and `event_type = equipment_failure`, skip automation tick.

#### 5. Event Logic

- Use another timer to check for random events every second.
- If event triggers (10% chance):
  - Set `event_active = true` and randomly select `event_type`.
  - Apply event effect (e.g., destroy doses, modify efficiency).
  - Start a 3-second timer.
  - After timer expires, reset event effects and set `event_active = false`.
  - Update event log with event description.

#### 6. Milestone and Endgame Checks

- After each distribution:
  - Check if Numbed Population matches a milestone (e.g., 100, 500, 999).
  - If milestone reached and not already triggered:
    - Display message in event log.
    - Optionally trigger audio playback.
    - Add milestone to `milestones_reached`.
  - Check if Un-Numbed Population ≤ 1.
  - If condition met, show endgame prompt UI.

#### 7. UI Updates

- Continuously update resource labels and efficiency labels:
  - Fade text color based on numbed percentage:
    - Calculate color using lerp formula.
    - Apply color to all TextMeshPro labels.

---

### Additional Notes

**Balancing**:

- Adjust costs, efficiencies, and event probabilities based on playtesting.
  - Example tweaks: Increase initial population for longer gameplay. Adjust upgrade costs for better progression pacing.

**Scalability**:

- For a longer game, increase total population (e.g., 10,000) and scale resource requirements proportionally.

**Visual Enhancements (Optional)**:

- Add a canvas with simple shapes or particle effects to represent the numbing wave.
  - Example: Gray particles spreading across the screen as numbed percentage increases.

**Audio Integration (Optional)**:

- Play album snippets or sound effects.
  - Trigger audio playback at milestones or events.

**Error Handling**:

- Ensure all calculations prevent negative values (e.g., Doses = max(0, Doses)).
- Handle edge cases (e.g., no un-numbed population left, insufficient resources).

---

### Current State of the Project

#### Changes from Original Prompt

- Added auto-harvesting and auto-production features.
- Introduced population growth mechanics.
- Implemented random events and milestones.
- Enhanced UI with new components and animations.

#### New Features

- Auto-harvesting and auto-production.
- Population growth mechanics.
- Random events and milestones.
- Enhanced UI with new components and animations.

#### Features Not Implemented

- Some specific research items and public opinion mechanics.

#### Areas for Expansion

- Further refinement of random events and milestones.
- Additional research items and public opinion mechanics.
- More detailed population growth and conversion mechanics.

### Code Analysis

#### Overview

The project is structured with clear separation of concerns, with types, hooks, state management, and components.

#### Key Components

- `useGameState`: Manages the game state and integrates various hooks.
- `Actions`, `Upgrades`, `Events`, `Research`, `PublicOpinion`, `NewUILayout`: UI components for different game features.
- `populationGrowth`, `autoHarvesting`, `autoProduction`, `essenceHarvesting`, `doseProduction`, `doseDistribution`, `distributorManagement`, `autoHarvesterManagement`, `autoProducerManagement`, `efficiencyUpgrades`, `automationLoop`, `randomEvents`, `eventTimer`, `researchPointGeneration`, `publicOpinionChanges`, `researchPurchasing`, `populationDecrease`, `populationConversion`: State management hooks for different game mechanics.

#### Deviations from Original Prompt

- Added auto-harvesting and auto-production features.
- Enhanced UI with new components and animations.

### Next Steps

#### Refinement

- Further refine random events and milestones.

#### Expansion

- Add more research items and public opinion mechanics.

#### Balancing

- Adjust costs, efficiencies, and event probabilities based on playtesting.

#### Scalability

- Increase total population and scale resource requirements proportionally for longer gameplay.
