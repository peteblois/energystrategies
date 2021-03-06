/* Copyright 2016 Google Inc. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
==============================================================================*/

/// <reference path="../typings/index.d.ts" />
/// <reference path="../dataset.d.ts" />

import * as formatters from '../formatters';
import * as util from '../util';


/**
 * A cross-scenario comparison table.
 *
 * TODO: implement a dynamic table that updates as the set of 'bookmarked'
 * scenarios changes.
 */
export class ComparisonTable {
  element: HTMLElement;
  reference: ScenarioOutcome;
  scenarios: TitledScenarioOutcome[];

  constructor(
      element: HTMLElement,
      reference: ScenarioOutcome,
      scenarios: TitledScenarioOutcome[]) {
    this.element = element;
    this.reference = reference;
    this.scenarios = scenarios;

    this.build();
  }

  build() {
    this.scenarios.forEach(landmark => {
      const deltas = util.deltas(this.reference, landmark);

      const co2 = document.createElement('td');
      co2.textContent = formatters.percentDeltaFormatter(deltas.co2);

      const cost = document.createElement('td');
      cost.textContent = formatters.percentDeltaFormatter(deltas.cost);

      const title = document.createElement('td');
      title.classList.add('mdl-data-table__cell--non-numeric');
      title.textContent = landmark.title;

      const row = document.createElement('tr');
      row.appendChild(co2);
      row.appendChild(cost);
      row.appendChild(title);
      this.element.insertBefore(row, this.element.firstChild);
    });
  }
}
