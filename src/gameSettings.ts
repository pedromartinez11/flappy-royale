import _ = require("lodash")

interface GameSettings {
    sound: boolean
    haptics: boolean
    darkMode: boolean
    autoDarkMode: boolean
    quality: GameQuality
}

export enum GameQuality {
    Auto = 0,
    Low,
    High
}

const defaultSettings: GameSettings = {
    sound: true,
    haptics: true,
    darkMode: false,
    autoDarkMode: false,
    quality: GameQuality.Auto
}

let useAutoLowQualityMode: boolean | undefined

const LocalStorageKey = "GameSettings"

export const getSettings = (): GameSettings => {
    const stored = localStorage.getItem(LocalStorageKey)

    if (stored) {
        var settings = JSON.parse(stored)
    }

    return { ...defaultSettings, ...settings }
}

export const saveSettings = (settings: Partial<GameSettings>) => {
    const existing = getSettings()
    const newSettings = { ...existing, ...settings }
    localStorage.setItem(LocalStorageKey, JSON.stringify(newSettings))
}

export const enableAutoLowQualityMode = () => {
    useAutoLowQualityMode = true
}

export const useLowQuality = (): boolean => {
    const setting = getSettings().quality
    return setting === GameQuality.Low || (setting === GameQuality.Auto && useAutoLowQualityMode === true)
}

export const shouldMeasureQuality = (): boolean => {
    return _.isUndefined(useAutoLowQualityMode) && getSettings().quality === GameQuality.Auto
}
