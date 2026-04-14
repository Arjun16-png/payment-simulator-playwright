import { test,expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/')
})

test ('successful payment', async ({ page }) => {
    await page.fill('#amount', '500')
    await page.click('button')
    expect(page.locator('#result')).toContainText('00')
})

test ('insufficient fund', async ({ page }) => {
    await page.fill('#amount', '50000')
    await page.click('button')
    expect(page.locator('#result')).toContainText('51')
})

test ('invalid amount', async ({ page }) => {
    await page.fill('#amount', '-200')
    await page.click('button')
    expect(page.locator('#result')).toContainText('INVALID')
})

test ('invalid zero amount', async ({ page }) => {
    await page.fill('#amount','0')
    await page.click('button')
    expect(page.locator('#result')).toContainText('INVALID')
})

test ('timeout payment retry success', async ({ page }) => {
    await page.fill('#amount', '999')

    await page.click('button')
    expect(page.locator('#result')).toContainText('68')

    await page.click('button')
    expect(page.locator('#result')).toContainText('00')
})