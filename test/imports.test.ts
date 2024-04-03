describe('import vue components', () => {
  test('normal imports as expected', async () => {
    const cmp = await import('./Hello.vue')
    expect(cmp).toBeDefined()
  })

  test('template string imports as expected', async () => {
    const cmp = await import(`./Hello.vue`)
    expect(cmp).toBeDefined()
  })

  test('dynamic imports as expected', async () => {
    const name = 'Hello'
    const cmp = await import(`./${name}.vue`)
    expect(cmp).toBeDefined()
  })
})
