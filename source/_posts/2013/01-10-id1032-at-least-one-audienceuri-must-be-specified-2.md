---
title: 'ID1032: At least one audienceUri must be specified'
tags:
  - Federation
  - WCF
  - WIF
date: 2013-01-10T11:57:04.000Z
author: Fabian Wetzel
---

**Problem:** 

ID1032: At least one 'audienceUri' must be specified in the SamlSecurityTokenRequirement when the AudienceUriMode is set to 'Always' or 'BearerKeyOnly'. Either add the valid URI values to the AudienceUris property of SamlSecurityTokenRequirement, or turn off checking by specifying an AudienceUriMode of 'Never' on the SamlSecurityTokenRequirement. 

**Context:** 
I have an active STS implemented which can happily issue tokens but throws the quoted exception in case of issuing ActAs-tokens. 

**Solution:** 
I had to add the AudienceUris section to the ActAs handler section:
```xml
<microsoft.identityModel>
    <service saveBootstrapTokens="true">
…
      <!-- An ActAs handlers will be required to support delegation -->
      <securityTokenHandlers name="ActAs">
        <securityTokenHandlerConfiguration >
          <audienceUris>
            <add value="https://localhost/…" />
          </audienceUris>
          <issuerNameRegistry type="Microsoft.IdentityModel.Tokens.ConfigurationBasedIssuerNameRegistry, Microsoft.IdentityModel, Version=3.5.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35">
            <trustedIssuers>
              <add thumbprint="123efg1231231232abc" name="ABCD.Auth.FederationProvider" />
            </trustedIssuers>
          </issuerNameRegistry>
        </securityTokenHandlerConfiguration>
        <add type="Microsoft.IdentityModel.Tokens.Saml11.Saml11SecurityTokenHandler, Microsoft.IdentityModel, Version=3.5.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35" />
      </securityTokenHandlers>
```