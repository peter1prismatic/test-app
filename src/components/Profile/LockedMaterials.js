import React from "react";
import "./LockedMaterials.css";
import { v4 as uuidv4 } from "uuid";

export default function LockedMaterials({ title, items }) {
  return (
    <div className="locked-materials-container">
      <div className="onboarding-materials-text">{title}</div>
      {/* <div className="inner-onboarding-materials-container">
        <div className="nav-dot-container">
          <div className="nav-dot"></div>
          <div className="nav-dot-bar"></div>
          <div className="nav-dot"></div>
          <div className="nav-dot-bar"></div>
          <div className="nav-dot"></div>
        </div>

        <div className="onboarding-materials-list">
          <div>Pitch Deck</div>
          <div>Pitch Deck</div>
          <div>Pitch Deck</div>
        </div>
      </div> */}
      <div className="video-nav-container">
        <div className="video-nav-dots">
          <div className="nav-dot-container">
            <div className="inner-nav-dot-container">
              <div className="nav-dot"></div>
            </div>
          </div>
          <div className="nav-dot-bar"></div>
          <div className="inner-nav-dot-container">
            <div className="nav-dot"></div>
          </div>
          <div className="nav-dot-bar"></div>
          <div className="inner-nav-dot-container">
            <div className="nav-dot"></div>
          </div>
        </div>
        <div className="video-nav-onboarding">
          {items.map((item) => {
            return (
              <div
                className="inner-onboarding-list-item-container"
                key={uuidv4()}
              >
                <div className="nav-item">{item}</div>
                <i class="fas fa-lock"></i>
              </div>
            );
          })}
          {/* <div className="inner-onboarding-list-item-container">
            <div className="nav-item">{items[0]}</div>
            <i class="fas fa-lock"></i>
          </div>
          <div className="inner-onboarding-list-item-container">
            <div className="nav-item">Investment Examples</div>
            <i class="fas fa-lock"></i>
          </div>
          <div className="inner-onboarding-list-item-container">
            <div className="nav-item">Recent Factsheet</div>
            <i class="fas fa-lock"></i>
          </div> */}
        </div>
      </div>
    </div>
  );
}
