# MVP Release Candidate Checklist

## Automated Checks

- [ ] `git diff --check`
- [ ] `npm run typecheck`
- [ ] `npm run lint`
- [ ] `npm run build`
- [ ] `npm run validate:mvp`

## Public Route Checks

- [ ] `/`
- [ ] `/child`
- [ ] `/parent`
- [ ] `/about/local-data`
- [ ] `/child/curriculum`
- [ ] Five preview lessons

## Local Profile Checks

- [ ] Create a local profile
- [ ] Edit the local profile
- [ ] Clear the local profile
- [ ] Verify no login is required
- [ ] Verify grade does not gate lessons

## Local Progress Checks

- [ ] Complete a lesson
- [ ] Verify the return notice
- [ ] Verify the next incomplete lesson is suggested
- [ ] Clear preview progress
- [ ] Verify progress is browser/device-local only

## Error And Empty States

- [ ] An unknown route shows the friendly 404 page
- [ ] Global error reset UI has no external logging
- [ ] Curriculum loading state renders

## Boundaries

- [ ] No official full ŠVP alignment claim
- [ ] No diagnostic or mastery claim
- [ ] No account analytics claim
- [ ] No multi-device sync claim
- [ ] No classroom or teacher workflow claim

## Release Decision

- [ ] Ready for private demo
- [ ] Ready for limited soft launch
- [ ] Blocked pending fixes
